import {action, computed, observable, runInAction} from "mobx";
import Route from "../types/Route";
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";

const sortRules = new Map<SortBy, (a: Route, b: Route) => number>([
    [SortBy.DEFAULT, () => 0],
	[SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
	[SortBy.RATING_AVG, (a, b) => a.rating.average < b.rating.average ? 1 : -1],
	[SortBy.RATING_COUNT, (a, b) => a.rating.count < b.rating.count ? 1 : -1],
    [SortBy.ROUTE_DISTANCE, (a, b) => a.distance < b.distance ? 1 : -1],
	[SortBy.TIME, (a, b) => a.duration < b.duration ? 1 : -1],
	[SortBy.OBJECTS_COUNT, (a, b) => a.placesCount < b.placesCount ? 1 : -1]
]);

export default class RoutesStore extends BaseEntityStore {

	@observable
	private list: Route[] = [];

	@action
	async fetchList() {
		const res = await fetch('/api/routes');

		if (res.ok) {
			const nextList: Route[] = await res.json();

			runInAction(() => {
				this.list = nextList;
			});
			return;
		}

		console.error(`Can't fetch routes list - server respond with a status ${res.status}`);

		runInAction(() => {
			this.list = [];
		});
	}

	@action
	public updateSearch(searchString: string) {
		this.searchString = searchString;
	}

	@computed
	public get routes() {
		return this.list
			.filter(({ name }) => name.match(new RegExp(this.searchString, 'gi')))
			.sort(sortRules.get(this.sortBy));
	}

	init() {
		this.fetchList();
	}

}
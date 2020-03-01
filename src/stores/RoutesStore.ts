import {action, computed, observable, runInAction} from "mobx";
import Route, {RouteBase} from "../types/Route";
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";

const sortRules = new Map<SortBy, (a: RouteBase, b: RouteBase) => number>([
    [SortBy.DEFAULT, () => 0],
	[SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
	[SortBy.RATING_AVG, (a, b) => a.rating.average < b.rating.average ? 1 : -1],
	[SortBy.RATING_COUNT, (a, b) => a.rating.count < b.rating.count ? 1 : -1],
    [SortBy.ROUTE_DISTANCE, (a, b) => a.distance < b.distance ? 1 : -1],
	[SortBy.TIME, (a, b) => a.duration < b.duration ? 1 : -1],
	[SortBy.OBJECTS_COUNT, (a, b) => a.placesCount < b.placesCount ? 1 : -1]
]);

export default class RoutesStore extends BaseEntityStore<Route> {

	@observable
	private list: RouteBase[] = [];

	constructor() {
		super();
		this.apiPath = '/api/routes';
	}

	@action
	async fetchList() {
		const res = await fetch(this.apiPath);

		if (res.ok) {
			const nextList: RouteBase[] = await res.json();

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
	updateSearch(searchString: string) {
		this.searchString = searchString;
	}

	@computed
	get routes() {
		return this.list
			.filter(({ name }) => name.match(new RegExp(this.searchString, 'gi')))
			.sort(sortRules.get(this.sortBy));
	}

	init() {
		this.fetchList();
	}

}
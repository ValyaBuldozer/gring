import {action, computed, observable, runInAction} from "mobx";
import Route, {RouteBase} from "../types/Route";
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";
import Api from '../api/Api';

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

	constructor(private api: Api) {
		super();
	}

	@action
	async fetchList() {
		this.list = await this.api.fetchRoutes();
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

	async fetchDetailEntity(id: number): Promise<Route | null> {
		if (this.detailEntityCache.has(id)) {
			return this.detailEntityCache.get(id)!;
		}

		const route = await this.api.fetchDetailRoute(id);

		if (route != null) {
			this.detailEntityCache.set(id, route);
		}

		return route;
	}

	async init() {
		await this.fetchList();
	}

}
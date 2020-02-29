import {action, observable, runInAction, computed} from "mobx";
import Route from "../types/Route";
import SortBy from "../util/types/SortBy";

const sortRules = new Map<SortBy, (a: Route, b: Route) => number>([
    [SortBy.DEFAULT, () => 0],
	[SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
	// todo: use reviews
    [SortBy.RATING_AVG, (a, b) => a.placesCount < b.placesCount ? 1 : -1],
    [SortBy.RATING_COUNT, (a, b) => a.placesCount < b.placesCount ? 1 : -1],
    [SortBy.DISTANCE, () => 0]
]);

export default class RoutesStore {

	@observable
	private list: Route[] = [];
	
	@observable
	private sortBy: SortBy = SortBy.DEFAULT;

	@observable
	private searchString: string = '';

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
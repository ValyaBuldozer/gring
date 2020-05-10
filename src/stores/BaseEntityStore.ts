import {action, observable} from "mobx";
import SortBy from "../util/types/SortBy";


export default abstract class BaseEntityStore<T> {
	protected detailEntityCache: Map<number, T>;

	protected constructor() {
		this.detailEntityCache = new Map<number, T>();
	}

	@observable
	public sortBy: SortBy = SortBy.DEFAULT;

	@observable
	public searchString: string = '';

	@action
	setSearchString = (str: string) => {
		this.searchString = str;
	};

	@action
	setSortBy = (sortBy: SortBy) => {
		this.sortBy = sortBy;
	};
}
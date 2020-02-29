import {action, observable} from "mobx";
import SortBy from "../util/types/SortBy";


export default abstract class BaseEntityStore {
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
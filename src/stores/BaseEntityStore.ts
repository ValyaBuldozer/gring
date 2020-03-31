import {action, observable} from "mobx";
import SortBy from "../util/types/SortBy";


export default abstract class BaseEntityStore<T> {
	protected apiPath: string;
	protected detailEntityCache: Map<number, T>;

	protected constructor() {
		this.apiPath = '';
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

	async fetchDetailEntity(id: number): Promise<T | null> {
		if (this.detailEntityCache.has(id)) {
			return this.detailEntityCache.get(id)!;
		}

		const res = await fetch(`${this.apiPath}/${id}`);

		if (res.ok) {
			const obj: T = await res.json();
			this.detailEntityCache.set(id, obj);

			return obj;
		} else if (res.status == 404) {
			return null;
		} else {
			throw new Error(`Can't fetch entity with id ${id}: ${res.statusText}`);
		}
	}
}
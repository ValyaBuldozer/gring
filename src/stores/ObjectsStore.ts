import {action, computed, observable, runInAction} from 'mobx';
import Obj, {ObjectBase} from '../types/Object';
import Category from '../types/Category';
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";
import Api from '../api/Api';

const sortRules = new Map<SortBy, (a: ObjectBase, b: ObjectBase) => number>([
    [SortBy.DEFAULT, () => 0],
    [SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
    [SortBy.RATING_AVG, (a, b) => a.rating.average < b.rating.average ? 1 : -1],
    [SortBy.RATING_COUNT, (a, b) => a.rating.count < b.rating.count ? 1 : -1],
    // todo: implement using distance info
    [SortBy.DISTANCE, () => 0]
]);

export default class ObjectsStore extends BaseEntityStore<Obj> {

    @observable
    private objectsList: ObjectBase[] = [];

    constructor(private api: Api) {
        super();
    }

    @observable
    public categories: Category[] | null = null;

    @observable 
    public selectedCategory: Category | null = null;

    @observable
    public isLoading: boolean = true;

    @computed
    get list() {
        const categoryFiltered = this.selectedCategory != null ?
            this.objectsList.filter(obj => obj.categories.some(cat => cat.id == this.selectedCategory?.id)) :
            this.objectsList;

        const searchFiltered =  this.searchString != null ? categoryFiltered.filter(
            obj => obj.name.match(new RegExp(this.searchString, 'gi'))
        ) : categoryFiltered;

        return searchFiltered.sort(sortRules.get(this.sortBy));
    }

    @action
    selectCategory(category: Category | null) {
        this.selectedCategory = category;
    }

    @action
    async fetchObjects() {
        this.isLoading = true;
        this.objectsList  = await this.api.fetchObjects();
        this.isLoading = false;
    }

    @action
    async fetchCategories() {
        this.categories = await this.api.fetchCategories();
    }

    async fetchDetailEntity(id: number): Promise<Obj | null> {
        if (this.detailEntityCache.has(id)) {
            return this.detailEntityCache.get(id)!;
        }

        const obj = await this.api.fetchDetailObject(id);

        if (obj != null) {
            this.detailEntityCache.set(id, obj);
        }

        return obj;
    }

    async init() {
        await this.fetchCategories();
        await this.fetchObjects();
    }
}

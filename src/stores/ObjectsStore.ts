import {action, computed, observable, runInAction} from 'mobx';
import Obj, {ObjectBase} from '../types/Object';
import Category from '../types/Category';
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";

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

    constructor() {
        super();
        this.apiPath = '/api/objects';
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

        const res = await fetch(this.apiPath);

        if (!res.ok) {
            runInAction(() => {
                this.objectsList = [];
                this.isLoading = false;
            });
            return;
        }

        const objects: Obj[] = await res.json();

        runInAction(() => {
            this.objectsList = objects;
            this.isLoading = false;
        });
    }

    @action
    async fetchCategories() {
        const res = await fetch('/api/categories');

        if (!res.ok) {
            runInAction(() => {
                this.categories = null;
            });

            return;
        }

        const categories: Category[] = await res.json();

        runInAction(() => {
            this.categories = categories;
        })
    }

    init() {
        this.fetchObjects();
        this.fetchCategories();
    }
}

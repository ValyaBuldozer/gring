import {action, computed, observable, runInAction} from 'mobx';
import Obj from '../types/Object';
import Category from '../types/Category';
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";

const sortRules = new Map<SortBy, (a: Obj, b: Obj) => number>([
    [SortBy.DEFAULT, () => 0],
    [SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
    [SortBy.RATING_AVG, (a, b) => a.rating.average < b.rating.average ? 1 : -1],
    [SortBy.RATING_COUNT, (a, b) => a.rating.count < b.rating.count ? 1 : -1],
    [SortBy.DISTANCE, () => 0]
]);

export default class ObjectsStore extends BaseEntityStore {

    @observable
    private objectsList: Obj[] = [];

    @observable
    private objectsCache: Map<number, Obj> = new Map<number, Obj>();

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

        const res = await fetch('/api/objects');

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

    getObjectById(id: number): Obj | Promise<boolean> {
        if (this.objectsCache.has(id)) {
            return this.objectsCache.get(id)!;
        } else {
            return fetch(`/api/objects/${id}`)
                .then(res => {
                    if (res.ok) {
                        res.json()
                            .then((obj: Obj) => runInAction(() => {
                                this.objectsCache.set(obj.id, obj);
                            }));

                        return true;
                    } else if (res.status == 404) {
                        return false;
                    } else {
                        throw new Error(`Error trying to fetch object - ${res.statusText}`);
                    }
                });
        }
    }

    init() {
        this.fetchObjects();
        this.fetchCategories();
    }
}

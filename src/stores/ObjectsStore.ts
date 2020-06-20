import { action, computed, observable, reaction } from 'mobx';
import Obj, { ObjectBase, ObjectType } from '../types/Object';
import Category from '../types/Category';
import SortBy from "../util/types/SortBy";
import BaseEntityStore from "./BaseEntityStore";
import Api from '../api/Api';
import GeolocationStore from './GelocationStore';

const sortRules = new Map<SortBy, (a: ObjectBase, b: ObjectBase) => number>([
    [SortBy.DEFAULT, () => 0],
    [SortBy.NAME, (a, b) => a.name.localeCompare(b.name)],
    [SortBy.RATING_AVG, (a, b) => a.rating.average < b.rating.average ? 1 : -1],
    [SortBy.RATING_COUNT, (a, b) => a.rating.count < b.rating.count ? 1 : -1],
    [SortBy.DISTANCE, (a, b) => {
        if (a.distance == null && b.distance == null) {
            return 0;
        }

        if (a.distance == null) {
            return 1;
        }

        if (b.distance == null) {
            return -1;
        }

        return a.distance > b.distance ? 1 : -1;
    }]
]);

export default class ObjectsStore extends BaseEntityStore<Obj> {

    @observable
    private objectsList: ObjectBase[] = [];

    constructor(private api: Api, private geolocationStore: GeolocationStore) {
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

    @computed
    get placesIds() {
        return this.list
            .filter(o => o.type === 'place')
            .map(o => o.id);
    }

    @action
    selectCategory(category: Category | null) {
        this.selectedCategory = category;
    }

    @action
    private async handleUserPositionChange(lat: number, lng: number) {
        if (!this.geolocationStore.isEnabled) {
            return;
        }

        const distances = await Promise.all(
            this.objectsList.map(obj => obj.type === ObjectType.PLACE || obj.type === ObjectType.PUBLIC_PLACE ?
                this.api.getDistance(obj.id, lat, lng) :
                null
            )
        );

        this.objectsList = this.objectsList.map((obj, idx) => ({
            ...obj,
            distance: distances[idx]
        }));
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
        reaction(
            () => [this.geolocationStore.latitude, this.geolocationStore.longitude] as const,
            ([lat, lng]) =>
                this.handleUserPositionChange(lat, lng)
        );
        this.handleUserPositionChange(this.geolocationStore.latitude, this.geolocationStore.longitude);
    }
}

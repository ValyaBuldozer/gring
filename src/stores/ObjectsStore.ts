import { observable, action, computed, runInAction } from 'mobx';
import Obj from '../types/Object';
import Category from '../types/Category';

export default class ObjectsStore {

    @observable
    private objects: Obj[] = [];

    @observable
    public categories: Category[] | null = null;

    @observable 
    public selectedCategory: Category | null = null;

    @observable
    public searchString: string | null = null;

    @observable
    public isLoading: boolean = true;

    @computed
    get objectsList() {
        return this.objects;
    }

    @computed
    get filtredList() {  
        const currentObjects = this.selectedCategory != null ? 
            this.objects.filter(obj => obj.categories.some(cat => cat.id == this.selectedCategory?.id)) : 
            this.objects;

        return this.searchString != null ? currentObjects.filter(
            obj => obj.name.split(new RegExp(this.searchString!!, 'gi')).length > 1
        ) : currentObjects;
    }

    @action
    setSearchString(str: string) {
        this.searchString = str !== '' ? str : null;
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
                this.objects = [];
                this.isLoading = false;
            });
            return;
        }

        const objects: Obj[] = await res.json();

        runInAction(() => {
            this.objects = objects;
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

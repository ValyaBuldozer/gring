import { observable, action, computed, runInAction } from 'mobx';
import Obj from '../types/Object';

export default class ObjectsStore {

    @observable
    private objects: Obj[] = [];

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
        if (this.searchString == null) {
            return this.objects;
        }

        return this.objects.filter(
            obj => obj.name.split(new RegExp(this.searchString!!, 'gi')).length > 1
        );
    }

    @action
    setSearchString(str: string) {
        this.searchString = str !== '' ? str : null;
    }

    @action
    async fetchList() {
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

    init() {
        this.fetchList();
    }
}

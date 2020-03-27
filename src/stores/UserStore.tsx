import { computed, observable } from "mobx";
import User from "../types/User";
import Entity from "../types/Entity";


export default class UserStore {

    @observable
    private currentUser: User | null = null;

    @observable
    private favoritesList: Entity[] | null = null;

    @computed
    get user() {
        return this.currentUser;
    }

    @computed
    get isAuthorized() {
        return this.currentUser != null;
    }

    @computed
    get favorites() {
        return this.favoritesList;
    }

    async fetchUser() {
        const res = await fetch('/api/user');

        if (res.ok) {
            this.currentUser = await res.json();
        } else if (res.status == 401) {
            console.log('Unauthorized');
            this.currentUser = null;
        } else {
            console.error(`Can't receive current user - ${res.status}`);
        }
    }

    async fetchFavorites() {
        if (this.user == null) {
            return;
        }

        const res = await fetch(`/api/user/favorite`);

        if (res.ok) {
            this.favoritesList = await res.json();
        } else {
            console.error(`Can't receive favorites - ${res.status}`);
        }
    }

    async signIn(username: string, password: string): Promise<string | null> {
        const res = await fetch('/api/token/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (res.status == 401) {
            return 'Invalid username or password';
        }

        if (res.status == 403) {
            return 'User have been banned';
        }

        if (!res.ok) {
            console.error(`can't execute login request - ${res.status}`);
            return 'Internal error';
        }

        this.init();
        return null;
    }

    async init() {
        await this.fetchUser();
        await this.fetchFavorites();
    }

}
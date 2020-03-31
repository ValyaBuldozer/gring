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
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (res.status == 400) {
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

    async signOn(username: string, password: string, email: string): Promise<string | null> {
        const res = await fetch('/api/user/registration', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });

        if (res.ok) {
            this.signIn(username, password);
            return null;
        }

        if (res.status == 400) {
            return await res.text();
        }

        console.error(`Can't sign on user - ${res.status}`);

        return 'Internal error';
    }

    async signOut() {
        if (!this.isAuthorized) {
            throw new Error('User not authorized');
        }

        const res = await fetch('/api/auth', {
            method: 'DELETE'
        });

        if (!res.ok) {
            console.error(`Can't logout - ${res.status}`);
        }
    }

    async refreshToken() {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST'
        });

        if (!res.ok) {
            console.error(`Can't refresh current token - ${res.status}`);
        }
    }

    async init() {
        await this.fetchUser();

        if (this.isAuthorized) {
            await this.fetchFavorites();
            await this.refreshToken();
        }
    }

}
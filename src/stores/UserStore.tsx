import { action, computed, observable } from "mobx";
import User from "../types/User";
import Entity from "../types/Entity";
import Api from '../api/Api';


export default class UserStore {

    constructor(private api: Api) {
    }

    @observable
    private currentUser: User | null = null;

    @observable
    private favoritesList: Entity[] | null = null;

    @observable
    private initialized: boolean = false;

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

    @computed
    get isInitialized() {
        return this.initialized;
    }

    async fetchUser() {
        this.currentUser = await this.api.fetchUser();
    }

    async fetchFavorites() {
        if (this.user == null) {
            return;
        }

        this.favoritesList = await this.api.fetchUserFavorites();
    }

    async signIn(username: string, password: string): Promise<string | null> {
        const res = await this.api.auth(username, password);

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
        const res = await this.api.register(username, password, email);

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

    @action
    async signOut() {
        if (!this.isAuthorized) {
            throw new Error('User not authorized');
        }

        const res = await this.api.signOut();

        if (!res.ok) {
            console.error(`Can't logout - ${res.status}`);
        }

        this.currentUser = null;
        this.favoritesList = null;
    }

    async refreshToken() {
        const res = await this.api.refreshToken();

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

        this.initialized = true;
    }

}
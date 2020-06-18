import { action, computed, observable } from "mobx";
import User from "../types/User";
import Entity from "../types/Entity";
import Api from '../api/Api';
import Review from '../types/Review';


export default class UserStore {

    constructor(private api: Api) {
    }

    @observable
    private currentUser: User | null = null;

    @observable
    private favoritesList: Entity[] | null = null;

    @observable
    visitedPlaces: Entity[] | null = null;

    @observable
    reviewsList: Review[] | null = null;

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

    @action
    async addReview(entityId: number, text: string | null, rating: number): Promise<boolean> {
        if (!this.reviewsList || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.addReview(entityId, rating, text);

        if (res.ok) {
            this.reviewsList.push({
                user: this.currentUser!,
                text,
                rating,
                entity: entityId,
                time: new Date().toISOString()
            });

            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async updateReview(entityId: number, text: string | null, rating: number): Promise<boolean> {
        if (!this.reviewsList || !this.isAuthorized) {
            return false;
        }

        const prevReview = this.reviewsList.find(r => r.entity == entityId);

        if (!prevReview) {
            throw new Error(`Can't find reviews for entity with id ${entityId}`)
        }

        const res = await this.api.updateReview(entityId, rating, text);

        if (res.ok) {
            prevReview.text = text;
            prevReview.rating = rating;
            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async removeReview(entityId: number): Promise<boolean> {
        if (!this.reviewsList || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.removeReview(entityId);

        if (res.ok) {
            this.reviewsList = this.reviewsList.filter(r => r.entity !== entityId);
            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async addToFavorites(entityId: number): Promise<boolean> {
        if (!this.favoritesList || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.addToFavorites(entityId);

        if (res.ok) {
            await this.fetchFavorites();
            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async removeFromFavorites(entityId: number): Promise<boolean> {
        if (!this.favoritesList || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.removeFromFavorites(entityId);

        if (res.ok) {
            this.favoritesList = this.favoritesList.filter(e => e.id !== entityId);
            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async addToVisitedPlaces(entityId: number): Promise<boolean> {
        if (!this.visitedPlaces || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.addToVisited(entityId);

        if (res.ok) {
            await this.fetchVisitedPlaces();
            return true;
        }

        console.error(res.statusText);
        return false;
    }

    @action
    async removeFromVisitedPlaces(entityId: number): Promise<boolean> {
        if (!this.visitedPlaces || !this.isAuthorized) {
            return false;
        }

        const res = await this.api.removeFromVisited(entityId);

        if (res.ok) {
            this.visitedPlaces = this.visitedPlaces.filter(e => e.id !== entityId);
            return true;
        }

        console.error(res.statusText);
        return false;
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

    async fetchVisitedPlaces() {
        if (this.user == null) {
            return;
        }

        this.visitedPlaces = await this.api.fetchVisitedPlaces();
    }

    async fetchUserReviews() {
        if (this.user == null) {
            return;
        }

        this.reviewsList = await this.api.fetchUserReviews();
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
        this.visitedPlaces = null;
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
            await this.fetchUserReviews();
            await this.fetchFavorites();
            await this.fetchVisitedPlaces();
            await this.refreshToken();
        }

        this.initialized = true;
    }

}
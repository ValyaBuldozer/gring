import Obj, { ObjectBase } from '../types/Object';
import Route, { RouteBase } from '../types/Route';
import Category from '../types/Category';
import User from '../types/User';
import SettingsStore from '../stores/SettingsStore';
import Entity from '../types/Entity';
import Review from '../types/Review';

const PREFIX = '/api';

export default class Api {

	constructor(private settings: SettingsStore) {
	}

	async fetchObjects(): Promise<ObjectBase[]> {
		return await this.get(`objects`) ?? [];
	}

	async fetchRoutesByObjectId(objectId: number): Promise<RouteBase[]> {
		return await this.get(`routes`, { object: objectId.toString() }) ?? [];
	}

	async fetchRoutes(): Promise<RouteBase[]> {
		return await this.get(`routes`) ?? [];
	}

	async fetchDetailRoute(id: number): Promise<Route | null> {
		return await this.get(`routes/${id}`);
	}

	async fetchDetailObject(id: number): Promise<Obj | null> {
		return await this.get(`objects/${id}`);
	}

	async fetchCategories(): Promise<Category[]> {
		return await this.get(`categories`) ?? [];
	}

	async fetchReviews(object?: number, limit?: number | null): Promise<Review[]> {
		return await this.get('reviews', this.formatSearchParams({ object, limit })) ?? [];
	}

	async fetchUser(): Promise<User | null> {
		const res = await fetch(`${PREFIX}/user`);

		if (res.ok) {
			return res.json();
		} else if (res.status == 401) {
			return null;
		} else {
			console.error(`Can't receive current user - ${res.status}`);
			return null;
		}
	}

	async fetchUserFavorites(): Promise<Entity[]> {
		return await this.get('user/favorite') ?? [];
	}

	async auth(username: string, password: string): Promise<Response> {
		return this.post('auth', { username, password });
	}

	async register(username: string, password: string, email: string): Promise<Response> {
		return this.put('user/registration', { username, password, email });
	}

	async refreshToken(): Promise<Response> {
		return this.post('auth/refresh');
	}

	async signOut(): Promise<Response> {
		return this.delete('auth');
	}

	private async get<T>(url: string, searchParams: Record<string, string> = {}): Promise<T | null> {
		const params = new URLSearchParams({
			locale: this.settings.locale,
			...searchParams
		});

		const res = await fetch(`${PREFIX}/${url}?${params}`);

		if (res.ok) {
			return res.json();
		}

		console.error(`Can't execute request on ${url}: ${res.statusText}`);
		return null;
	}

	private async post(url: string, body: any = {}): Promise<Response> {
		return fetch(`${PREFIX}/${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				locale: this.settings.locale
			},
			body: JSON.stringify(body)
		});
	}

	private async put(url: string, body: any = {}): Promise<Response> {
		return fetch(`${PREFIX}/${url}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				locale: this.settings.locale
			},
			body: JSON.stringify(body)
		});
	}

	private async delete(url: string): Promise<Response> {
		return fetch(`${PREFIX}/${url}`, {
			method: 'DELETE',
			headers: {
				locale: this.settings.locale
			}
		});
	}

	private formatSearchParams(params: Record<string, string | number | unknown | null>): Record<string, string> {
		return Object.fromEntries(
			Object.entries(params)
				.filter(([key, value]) => value != null)
				.map(([key, value]) => [key, (value as string | number).toString()])
		)
	}
}

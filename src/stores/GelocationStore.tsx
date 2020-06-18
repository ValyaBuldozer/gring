import { action, autorun, computed, observable } from 'mobx';


export default class GeolocationStore {
	constructor() {
		this.init();

		autorun(() => {
			console.log(this.latitude);
			console.log(this.longitude);
		})
	}

	@computed get isEnabled() {
		return this.latitude !== 0 && this.longitude !== 0;
	}

	@observable latitude = 0;

	@observable longitude = 0;

	@action
	private onPositionChange = (pos: Position) => {
		this.latitude = pos.coords.latitude;
		this.longitude = pos.coords.longitude;
	};

	private init() {
		if (!navigator.geolocation) {
			console.error('Geolocation service not supported.');
			return;
		}

		navigator.geolocation.watchPosition(
			this.onPositionChange,
			e => console.error(e),
			{ timeout: 5000, maximumAge: 60 }
		);
	}
}

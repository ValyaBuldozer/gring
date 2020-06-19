import Entity from "./Entity";
import Place from './Place';

export interface RouteBase extends Entity {
    placesCount: number;
    distance: number,
    duration: number;
    rating: {
        count: number;
        average: number;
    }
}

export default interface Route extends RouteBase {
    description: string;
    places: Place[];
}

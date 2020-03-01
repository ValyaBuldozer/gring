import Obj from "./Object";

export interface RouteBase {
    id: number;
    name: string;
    placesCount: number;
    image: string;
    distance: number,
    duration: number;
    rating: {
        count: number;
        average: number;
    }
}

export default interface Route extends RouteBase {
    description: string;
    objects: (Obj & {
        description: string;
    })[];
}

import Obj from "./Object";

export interface RouteBase {
    id: number;
    name: string;
    objectsCount: number;
}

export default interface Route extends RouteBase {
    description: string;
    objects: Obj[];
}

import { ObjectType } from "./Object";

const enum RouteEnumType {
    ROUTE = 'route'
}

export type EntityType = ObjectType | RouteEnumType;

export default interface Entity {
    id: number;
    type: EntityType;
    name: string;
    image: string;
}

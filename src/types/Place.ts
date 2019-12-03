import { ObjectBase, ObjectType } from "./Object";

export default interface Place extends ObjectBase {
    type: ObjectType.PLACE;
    address: string;
    geolocation: Geolocation;
    routes: number[];
}

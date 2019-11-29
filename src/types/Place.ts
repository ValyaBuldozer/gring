import Obj, { ObjectType } from "./Object";

export default interface Place extends Obj {
    type: ObjectType.PLACE;
    address: string;
    geolocation: Geolocation;
}

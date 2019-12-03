import { ObjectBase, ObjectType } from "./Object";
import Timetable from "./TimeTable";

export default interface PublicPlace extends ObjectBase {
    type: ObjectType.PUBLIC_PLACE;
    address: string;
    geolocation: Geolocation;
    timetable: Timetable[];
    routes: number[];
}

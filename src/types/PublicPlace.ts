import Obj, { ObjectType } from "./Object";
import Timetable from "./TimeTable";

export default interface PublicPlace extends Obj {
    type: ObjectType.PUBLIC_PLACE;
    address: string;
    geolocation: Geolocation;
    timetable: Timetable[];
}

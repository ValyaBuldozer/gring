import Obj, { ObjectType } from "./Object";

export default interface HistoricalPerson extends Obj {
    type: ObjectType.HISTORICAL_PERSON;
    name: string;
    secondName: string;
    patronymic: string | null;
    birthdate: string;
    deathdate: string | null;
    relatedObjects: Obj[];
}

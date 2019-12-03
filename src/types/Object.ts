import Category from "./Category";
import Place from "./Place";
import PublicPlace from "./PublicPlace";
import HistoricalPerson from "./HistoricalPerson";

export const enum ObjectType {
    PLACE = 'place',
    PUBLIC_PLACE = 'public_place',
    HISTORICAL_PERSON = 'historical_person'
}

export interface ObjectBase {
    type: ObjectType;
    id: number;
    name: string;
    image: string;
    audioguide: string;
    categories: Category[];
    description: string,
    rating: {
        average: number;
        count: number;
    }
}

type Obj = Place | PublicPlace | HistoricalPerson;

export default Obj;

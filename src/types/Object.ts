import Category from "./Category";

export const enum ObjectType {
    PLACE = 'place',
    PUBLIC_PLACE = 'public_place',
    HISTORICAL_PERSON = 'historical_person'
}

export default interface Obj {
    type: ObjectType;
    id: number;
    name: string;
    image: string;
    audioguide: string;
    categories: Category[];
    rating: {
        average: number;
        count: number;
    }
}

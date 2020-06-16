import User from "./User";

export default interface Review {
    user: User;
    entity: number;
    time: string;
    rating: number;
    text: string | null;
}

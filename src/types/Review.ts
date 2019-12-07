import User from "./User";

export default interface Review {
    user: User;
    object: number;
    time: string;
    rating: number;
    text: string | null;
}

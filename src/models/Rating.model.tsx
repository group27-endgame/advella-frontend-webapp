import User from "./User.model";

export default class Rating{
    public ratingId: number;
    public rating: number;
    public votes: number;
    public ratingUser: User;

    constructor(ratingId: number, votes: number, ratingUser: User, rating:number) {
        this.ratingId = ratingId;
        this.votes = votes;
        this.rating =rating,
        this.ratingUser = ratingUser;
    }
}
import {IVote} from "./IVote";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    votes: IVote[]
}

export interface IUserInputDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
}
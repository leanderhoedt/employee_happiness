export interface IVote {
    _id: string;
    mood: string;
    date: Date;
}

export interface IVoteInputDTO {
    mood: string;
    date: Date;
}
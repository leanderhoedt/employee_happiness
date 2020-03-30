export interface IVote {
    _id: string;
    mood: string;
    date: Date;
    user_id: string;
}

export interface IVoteInputDTO {
    mood: string;
}
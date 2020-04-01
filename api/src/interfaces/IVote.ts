export interface IVote {
    _id: string;
    mood: number;
    date: Date;
    user_id: string;
}

export interface IVoteInputDTO {
    mood: number;
    date?: Date;
}
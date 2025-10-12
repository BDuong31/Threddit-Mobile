export interface IPost {
    id: string,
    content: string,
    isPinned: boolean,
    createdAt: Date,
    updatedAt: Date,
    mentionedUser: string[],
    commentNumber: number,
    saveNumber: number,
    upvoteNumber: number,
    downvoteNumber: number
}

export interface Posts {
    cursor: string | null;
    posts: IPost[];
}
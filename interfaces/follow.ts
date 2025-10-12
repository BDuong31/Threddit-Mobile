interface IFollower {
    id: string;
    email: string;
    username: string;
}

interface IFollowers {
    follower: IFollower;
    createdAt: string;
    canFollow: boolean;
}
export interface Follower {
    followerList: IFollowers[];
    cursor: string | null;
}

interface IFollowing {
    id: string;
    email: string;
    username: string;
}

interface IFollowings {
    followee: IFollowing;
    createdAt: string;
    canFollow: boolean;
}

export interface Following {
    followingList: IFollowings[];
    cursor: string | null;
}
export interface IUser {
    username: string;
    email: string;
    followerNumber: number;
    followingNumber: number;
}
export interface IUserProfile {
    username: string;
    email: string;
    isFollow: boolean;
    followerNumber: number;
    followingNumber: number;
}
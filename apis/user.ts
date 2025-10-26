import { IApiResponse } from "../interfaces/api-response";
import { IUser, IUserProfile } from "../interfaces/user";
import { Follower, Following } from "../interfaces/follow";
import {
    default as axios,
    default as axiosInstance,
    endpoints,
} from "../lib/axios";

interface updateUsernameResponse {
    statusCode: number;
    message: string;
}

interface updateEmailResponse {
    statusCode: number;
    message: string;
}

interface changePasswordResponse {
    statusCode: number;
    message: string;
}

export const getUserProfile = async (): Promise<IApiResponse<IUser>> => {
    const response = await axiosInstance.get<IApiResponse<IUser>>(endpoints.account.userInfo);
    return response.data;
};

export const updateUsername = async (username: string): Promise<updateUsernameResponse | null> => {
    const response = await axiosInstance.post<updateUsernameResponse>(endpoints.account.updateUsername, {
        username,
    });
    return response.data;
}

export const changePassword = async (oldPassword: string, newPassword: string, confirmedNewPassword: string): Promise<changePasswordResponse | null> => {
    const response = await axiosInstance.post<changePasswordResponse>(endpoints.account.updatePasssword, {
        oldPassword,
        newPassword,
        confirmedNewPassword
    });
    return response.data;
}

export const getUserFollow = async (): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.get<IApiResponse<any>>(endpoints.follow.followUserMe);
    return response.data;
}

export const getUserFollowByUsername = async (usernname: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.get<IApiResponse<any>>(endpoints.follow.followUser(usernname));
    return response.data;
}

export const getUserFollowers = async (cursor: string | null): Promise<IApiResponse<Follower>> => {
    const response = await axiosInstance.get<IApiResponse<Follower>>(endpoints.follow.followersUserMe, {
        params: {
            cursor
        }
    });
    return response.data;
}

export const getUserFollowersByUsername = async (username: string, cursor: string | null): Promise<IApiResponse<Follower>> => {
    const response = await axiosInstance.get<IApiResponse<Follower>>(endpoints.follow.followersUser(username), {
        params: {
            cursor
        }
    });
    return response.data;
}

export const getUserFollowings = async (cursor: string | null): Promise<IApiResponse<Following>> => {
    const response = await axiosInstance.get<IApiResponse<Following>>(endpoints.follow.followingsUserMe, {
        params: {
            cursor
        }
    });
    return response.data;
}

export const getUserFollowingByUsername = async (username: string, cursor: string | null): Promise<IApiResponse<Following>> => {
    const response = await axiosInstance.get<IApiResponse<Following>>(endpoints.follow.followingsUser(username), {
        params: {
            cursor
        }
    });
    return response.data;
}

export const getUserStateByUsername = async (username: string): Promise<IApiResponse<IUserProfile>> => {
    const response = await axiosInstance.get<IApiResponse<IUserProfile>>(endpoints.follow.isFollow(username));
    return response.data;
}

export const followUser = async (username: string): Promise<any> => {
    const response = await axiosInstance.post<any>(endpoints.follow.follow(username));
    return response.data;
}

export const unfollowUser = async (username: string): Promise<any> => {
    const response = await axiosInstance.delete<any>(endpoints.follow.unfollow(username));
    return response.data;
}

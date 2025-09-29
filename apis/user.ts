import { IApiResponse } from "../interfaces/api-response";
import { IUser } from "../interfaces/user";
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
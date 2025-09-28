import { IApiResponse } from "../interfaces/api-response";
import { IUser } from "../interfaces/user";
import {
    default as axios,
    default as axiosInstance,
    endpoints,
} from "../lib/axios";

export const getUserProfile = async (): Promise<IApiResponse<IUser>> => {
    const response = await axiosInstance.get<IApiResponse<IUser>>(endpoints.account.userInfo);
    return response.data;
};
import { Posts } from "interfaces/post";
import axiosInstance, { endpoints } from "lib/axios";
import { IApiResponse } from "interfaces/api-response";

export const getPostsUser = async (): Promise<IApiResponse<Posts>> => {
    const response = await axiosInstance.get<IApiResponse<Posts>>(endpoints.post.postMe);
    return response.data;
}

export const getPostsByUsername = async (username: string, cursor: string | null): Promise<IApiResponse<Posts>> => {
    const response = await axiosInstance.get<IApiResponse<Posts>>(endpoints.post.getPostsByUsername(username, cursor));
    return response.data;
}

export const getPostSave = async (cursor: string | null): Promise<IApiResponse<Posts>> => {
    const response = await axiosInstance.get<IApiResponse<Posts>>(endpoints.post.getSavePosts(cursor));
    return response.data;
}
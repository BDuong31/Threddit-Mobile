import { CreatePost, Posts } from "interfaces/post";
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

export const pinPost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.post<IApiResponse<any>>(endpoints.post.pinPost(postId));
    return response.data;
}

export const unpinPost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.delete<IApiResponse<any>>(endpoints.post.pinPost(postId));
    return response.data;
}

export const createPost = async (dto: CreatePost): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.post<IApiResponse<any>>(endpoints.post.createPost, dto);
    return response.data;
}

export const deletePost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.delete<IApiResponse<any>>(endpoints.post.deletePost(postId));
    return response.data;
}

export const savePost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.post<IApiResponse<any>>(endpoints.post.savePost(postId));
    return response.data;
}

export const unsavePost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.delete<IApiResponse<any>>(endpoints.post.savePost(postId));
    return response.data;
}

export const votePost = async (postId: string, isUpVote: boolean): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.post<IApiResponse<any>>(endpoints.post.votePost(postId, isUpVote));
    return response.data;
}
export const unvotePost = async (postId: string): Promise<IApiResponse<any>> => {
    const response = await axiosInstance.delete<IApiResponse<any>>(endpoints.post.votePost(postId));
    return response.data;
}
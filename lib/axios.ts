import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const HOST_API = "https://threddit.onrender.com/api"; // đổi thành API backend của bạn

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(
      (error.response && error.response.data) || "Đã xảy ra lỗi"
    );
  }
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) =>{
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config});

    return res.data;
}

export const endpoints = {
    auth: {
        login: "/auth/signin",
        register: "/auth/signup",
        verify: "/auth/verifyaccount",
        resetPassword: "/auth/resetpassword",
        verifyResetPassword: "/auth/verifyresetpassword",
        googleRegister: "/auth/signup/google",
        googleLogin: "/auth/signin/google",
    },
    account: {
        logout: "/account/signout",
        updatePasssword: "/account/updatepassword",
        updateUsername: "/account/updateusername",
        userInfo: "/account/getuserinfo",
    },

    follow: {
        followUserMe: "/follow/me/count",
        followUser: (username: string) => `/follow/${username}/count`,
        followersUserMe: "/follow/me/followers",
        followersUser: (username: string) => `/follow/${username}/followers`,
        followingsUserMe: "/follow/me/followings",
        followingsUser: (username: string) => `/follow/${username}/followings`,
        follow: (username: string) => `/follow/${username}`,
        unfollow: (username: string) => `/follow/${username}`,
        isFollow: (username: string) => `/follow/${username}/state`
    },

    post: {
      postMe: "/post/me/createdpost",
      getPostsByUsername: (username: string, cursor: string | null) => 
        cursor ? `/post/${username}/createdpost?cursor=${cursor}` : `/post/${username}/createdpost`,
      getSavePosts: (cursor: string | null) => 
        cursor ? `/post/me/savedpost?cursor=${cursor}` : `/post/me/savedpost`,
      pinPost: (postId: string) => `/post/${postId}/pin`,
      createPost: "/post",
      deletePost: (postId: string) => `/post/${postId}`,
      savePost: (postId: string) => `/post/${postId}/save`,
      votePost: (postId: string, isUpVote?: boolean) => isUpVote !== undefined ? `/post/${postId}/vote/${isUpVote}` : `/post/${postId}/vote`,
    },

    notification: {
      listenNotification: "/notification/listen",
      getNotifications: (cursor: string | null) => 
        cursor ? `/notification?cursor=${cursor}` : `/notification`,
      getNotificationUnRead: (cursor: string | null) => 
        cursor ? `/notification/unread?cursor=${cursor}` : `/notification/unread`,
      readNotification: (id: string) => `/notification/${id}/read`,
      getNotificationCountUnRead: "/notification/count/unread",
    }
}
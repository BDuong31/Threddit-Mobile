import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HOST_API = "https://threddit.onrender.com/api"; // đổi thành API backend của bạn

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
        updateEmail: "/account/updateemail",
        userInfo: "/account/getuserinfo",
    }
}
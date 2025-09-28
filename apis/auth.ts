import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { endpoints } from '../lib/axios';

interface loginParams {
    email: string;
    password: string;
}

interface registerParams {
    username: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

interface verifyAccountParams {
    email: string;
    verificationCode: string;
}

interface resetPasswordParams {
    email: string;
}

interface verifyResetPasswordParams {
    email: string;
    verificationCode: string;
    newPassword: string;
    confirmedPassword: string;
}

interface googleSignUpParams {
    username: string;
    googleCode: string;
}

interface googleSignInParams {
    googleCode: string;
}

interface SignInResponse {
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
    };
}

interface SignUpResponse {
    statusCode: number;
    message: string;
}

export const signIn = async (email: string, password: string): Promise<SignInResponse | null> => {
    const response = await axiosInstance.post<SignInResponse>(endpoints.auth.login, {
        email,
        password,
    } as loginParams);
    return response.data;
}

export const signUp = async (username: string, email: string, password: string, confirmedPassword: string): Promise<SignUpResponse | null> => {
    const response = await axiosInstance.post<SignUpResponse>(endpoints.auth.register, {
        username,
        email,
        password,
        confirmedPassword,
    } as registerParams);
    return response.data;
}

export const verifyAccount = async (email: string, verificationCode: string): Promise<SignUpResponse | null> => {
    const response = await axiosInstance.post<SignUpResponse>(endpoints.auth.verify, {
        email,
        verificationCode,
    } as verifyAccountParams);
    return response.data;
}

export const signOut = async () => {
    const response = await axiosInstance.post(endpoints.account.logout);
    console.log(axiosInstance);
    return response.data;
}
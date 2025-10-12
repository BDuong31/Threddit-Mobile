import { IApiResponse } from "interfaces/api-response";
import { Notification, UnreadNotification } from "interfaces/notification";
import axiosInstance, { endpoints } from "lib/axios";

export const notificationListen = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(endpoints.notification.listenNotification);
    return response.data;
}

export const getNotifications = async (cursor: string | null): Promise<IApiResponse<Notification>> => {
    const response = await axiosInstance.get<IApiResponse<Notification>>(endpoints.notification.getNotifications(cursor));
    return response.data;
}

export const getNotificationUnRead = async (cursor: string | null): Promise<IApiResponse<UnreadNotification>> => {
    const response = await axiosInstance.get<IApiResponse<UnreadNotification>>(endpoints.notification.getNotificationUnRead(cursor));
    return response.data;
}

export const readNotifications = async (id: string): Promise<any> => {
    const response = await axiosInstance.post<any>(endpoints.notification.readNotification(id));
    return response.data;
}

export const getNotificationCountUnRead = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(endpoints.notification.getNotificationCountUnRead);
    return response.data;
}
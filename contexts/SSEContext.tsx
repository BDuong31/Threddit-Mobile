import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { endpoints, HOST_API } from "../lib/axios";
import { getNotificationCountUnRead, getNotifications, getNotificationUnRead, readNotifications } from "apis/notifcation";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { INotification } from "interfaces/notification";

interface SSEContextProps {
  notifications: INotification[];
  notificationCount: number;
  connect: () => Promise<void>;
  readNotification: (id: string) => Promise<void>;
  isConnected: boolean;
  disconnect: () => void;
}

const SSEContext = createContext<SSEContextProps>({
  notifications: [],
  notificationCount: 0,
  connect: async () => {},
  readNotification: async (id: string) => {},
  isConnected: false,
  disconnect: () => {},
});

export const SSEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("Không có token, không thể kết nối SSE.");
        return;
      }
      const es = new EventSourcePolyfill(`${HOST_API}${endpoints.notification.listenNotification}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Kết nối SSE đến:", es);

      es.addEventListener("open", () => {
        console.log("SSE connected : true");
        setIsConnected(true);
      });

      es.addEventListener("message", (event: any) => {
        try {
          const data = JSON.parse(event.data);
          getNotificationCount();
          setNotifications((prev) => [data, ...prev]);
        } catch (err) {
          console.warn("Lỗi parse SSE message:", err);
        }
      });

      es.addEventListener("error", (event: any) => {
        console.error("SSE error:", event);
      });

      eventSourceRef.current = es;
    } catch (err) {
      console.error("Không thể tạo kết nối SSE:", err);
    }
  };

  const disconnect = () => {
    if (eventSourceRef.current) {
      console.log("🔌 Ngắt kết nối SSE");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const getNotification= async() => {
    try {
        const responseNotification = await getNotifications(null);
        setNotifications(responseNotification.data.notifications);
    } catch (err) {
        console.error("Lỗi lấy thông báo:", err);
    }
  }

  const readNotification = async (id: string) => {
    try {
      const response = await readNotifications(id);
      console.log("Đánh dấu thông báo đã đọc:", response);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
      getNotificationCount();
    } catch (err) {
      console.error("Lỗi đánh dấu thông báo đã đọc:", err);
    }
  }

  const getNotificationCount = async () => {
    try {
      const response = await getNotificationCountUnRead();
      setNotificationCount(response.data);
    } catch (err) {
      console.error("Lỗi lấy số lượng thông báo chưa đọc:", err);
    }
  }

  useEffect(() => {
    connect();
    getNotification();
    getNotificationCount();
    return () => disconnect();
  }, []);

  console.log("SSE Connections:", isConnected );

  return (
    <SSEContext.Provider value={{ notifications, connect, disconnect, isConnected, readNotification, notificationCount }}>
      {children}
    </SSEContext.Provider>
  );
};

export const useSSE = () => useContext(SSEContext);

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { endpoints, HOST_API } from "../lib/axios";
import { getNotificationCountUnRead, getNotifications, readNotifications, getNotificationUnRead } from "apis/notifcation";
import { INotification } from "interfaces/notification";

interface SSEContextProps {
  notifications: INotification[];
  notificationsUnRead: INotification[];
  notificationCount: number;
  connect: () => Promise<void>;
  readNotification: (id: string) => Promise<void>;
  isConnected: boolean;
  disconnect: () => void;

  fetchMoreNotificationsAll: () => Promise<void>;
  isLoadingMoreAll: boolean;
  hasNextPageAll: boolean;

  fetchMoreNotificationsUnRead: () => Promise<void>;
  isLoadingMoreUnRead: boolean;
  hasNextPageUnRead: boolean;
}

const SSEContext = createContext<SSEContextProps>({
  notifications: [],
  notificationsUnRead: [],
  notificationCount: 0,
  connect: async () => {},
  readNotification: async (id: string) => {},
  isConnected: false,
  disconnect: () => {},

  fetchMoreNotificationsAll: async () => {},
  isLoadingMoreAll: false,
  hasNextPageAll: false,

  fetchMoreNotificationsUnRead: async () => {},
  isLoadingMoreUnRead: false,
  hasNextPageUnRead: false,
});

export const SSEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State cho 'All'
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [nextCursorAll, setNextCursorAll] = useState<string | null>(null);
  const [isLoadingMoreAll, setIsLoadingMoreAll] = useState(false);
  const [hasNextPageAll, setHasNextPageAll] = useState(true);

  // State cho 'UnRead'
  const [notificationsUnRead, setNotificationsUnRead] = useState<INotification[]>([]);
  const [nextCursorUnRead, setNextCursorUnRead] = useState<string | null>(null);
  const [isLoadingMoreUnRead, setIsLoadingMoreUnRead] = useState(false);
  const [hasNextPageUnRead, setHasNextPageUnRead] = useState(true);

  // State chung
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
          setNotificationsUnRead((prev) => [data, ...prev]);
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

  // --- Logic cho 'All' ---
  const fetchNotificationsAll = async (cursor: string | null = null) => {
    if (isLoadingMoreAll) return;
    const loadingMore = cursor !== null;
    if (loadingMore) {
      if (!hasNextPageAll) return;
      setIsLoadingMoreAll(true);
    }

    try {
      const response = await getNotifications(cursor);
      const newNotifications = response.data?.notifications || []; // Đảm bảo là mảng
      const newCursor = response.data?.cursor;

      setNotifications((prev) => loadingMore ? [...prev, ...newNotifications] : newNotifications);
      setNextCursorAll(newCursor);
      setHasNextPageAll(!!newCursor);
    } catch (err) {
      console.error("Lỗi lấy thêm thông báo:", err);
    } finally {
      if (loadingMore) {
        setIsLoadingMoreAll(false);
      }
    }
  }

  const fetchMoreNotificationsAll = async () => {
    await fetchNotificationsAll(nextCursorAll);
  }

  // --- Logic cho 'UnRead' ---
  const fetchNotificationsUnRead = async (cursor: string | null = null) => {
    if (isLoadingMoreUnRead) return;
    const loadingMore = cursor !== null;
    if (loadingMore) {
      if (!hasNextPageUnRead) return;
      setIsLoadingMoreUnRead(true);
    }

    try {
      const response = await getNotificationUnRead(cursor);
      const newNotifications = response?.data?.unreadNotifications || [];
      const newCursor = response.data?.cursor;

      setNotificationsUnRead((prev) => loadingMore ? [...prev, ...newNotifications] : newNotifications);
      setNextCursorUnRead(newCursor);
      setHasNextPageUnRead(!!newCursor);
    } catch (err) {
      console.error("Lỗi lấy thêm thông báo chưa đọc:", err);
    } finally {
      if (loadingMore) {
        setIsLoadingMoreUnRead(false);
      }
    }
  }

  const fetchMoreNotificationsUnRead = async () => {
    await fetchNotificationsUnRead(nextCursorUnRead);
  }

  // --- Logic chung ---
  const readNotification = async (id: string) => {
    try {
      const response = await readNotifications(id);
      console.log("Đánh dấu thông báo đã đọc:", response);
      
      // Cập nhật list 'All'
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
      
      setNotificationsUnRead((prev) => prev.filter((notif) => notif.id !== id));
      
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
    fetchNotificationsAll(null);
    fetchNotificationsUnRead(null);
    getNotificationCount();
    return () => disconnect();
  }, []);

  console.log("SSE Connections:", isConnected );

  return (
    <SSEContext.Provider value={{ 
        notifications, 
        notificationsUnRead, 
        connect, 
        disconnect, 
        isConnected, 
        readNotification, 
        notificationCount, 
        fetchMoreNotificationsAll, 
        isLoadingMoreAll, 
        hasNextPageAll, 
        fetchMoreNotificationsUnRead, 
        isLoadingMoreUnRead, 
        hasNextPageUnRead
    }}>
      {children}
    </SSEContext.Provider>
  );
};

export const useSSE = () => useContext(SSEContext);
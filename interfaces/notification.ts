export interface INotification {
  id: string;
  createdAt: Date;
  type: string;
  target: string;
  isRead: boolean;
  content: string;
}

export interface Notification {
    cursor: string | null;
    notifications: INotification[];
}

export interface UnreadNotification {
    cursor: string | null;
    unreadNotifications: number;
}
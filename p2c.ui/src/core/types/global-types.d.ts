export {};

declare global {
  type DataListItem = { value: string | number; name: string };

  interface ApiResponse {
    status: boolean;
    data: unknown;
    message?: string;
  }

  interface RoutesType {
    name: string;
    layout: string;
    component: React.ReactNode;
    icon: React.ReactNode;
    path: string;
  }

  interface RouteChild {
    name: string;
    path: string;
    icon: React.ReactNode;
    display: boolean;
    component: React.ReactNode;
  }

  interface Path {
    name: string;
    path: string;
    isEnabled: boolean;
  }

  interface Pagination<T> {
    items: T[];
    pageSize?: number;
    pageNumber?: number;
    totalCount?: number;
    totalPage?: number;
  }

  // new content
  interface User {
    userId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    lastSeen?: string;
    isOnline: boolean;
  }

  interface Message {
    messageId: string;
    senderUserId: string;
    receiverUserId: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    isEncrypted: boolean;
    encryptionKey?: string;
  }

  interface Chat {
    chatId: string;
    user1Id: string;
    user2Id: string;
    messages: Message[];
    lastMessageTimestamp: string;
    isActive: boolean;
  }

  type OfflineMessage = Message;
}

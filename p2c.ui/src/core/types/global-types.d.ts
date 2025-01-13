export {};

declare global {
  type DataListItem = { value: string | number; name: string };

  interface ApiResponse {
    status: boolean;
    data: unknown;
    statusCode: number;
    message?: string;
  }

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
    chatId: string;
  }

  interface ChatRoom {
    chatId: string;
    user1Id: string;
    user1Name: string;
    user2Id: string;
    user2Name: string;
    messages: Message[];
    lastMessageTimestamp: string;
    isActive: boolean;
  }

  type OfflineMessage = Message;
}

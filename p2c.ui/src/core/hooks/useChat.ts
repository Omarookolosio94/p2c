import { useEffect, useState, useCallback } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useBoundStore } from "../../core/stores/useBoundStore";

const useChat = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string | null>(null); // Track referenceId dynamically
  const { setCurrentChatId, setMessages, setChatRooms, setMessage } =
    useBoundStore();

  const startConnection = useCallback(() => {
    if (!referenceId) {
      console.error("ReferenceId is not set. Cannot establish connection.");
      return;
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_SIGNALR_URL}?referenceId=${referenceId}`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect([0, 5000, 10000, 20000, 30000]) // Custom reconnect intervals
      .build();

    newConnection.on("ChatHistory", (messages: Message[]) => {
      console.log("ChatHistory", messages);
      setMessages(messages);
    });

    newConnection.on("RoomJoined", (chatId: string) => {
      setCurrentChatId(chatId);
      console.log("RoomJoined: ", chatId);
    });

    newConnection.on("UserChatRooms", (chatrooms: ChatRoom[]) => {
      console.log("UserChatRooms", chatrooms);
      setChatRooms(chatrooms);
    });

    newConnection.on("ReceiveMessage", (message: Message) => {
      console.log("ReceiveMessage", message);
      setMessage(message);
    });

    newConnection.onclose(() => {
      setIsConnected(false);
      console.log("Connection lost. Attempting to reconnect...");
    });

    setConnection(newConnection);

    // Start the connection
    newConnection
      .start()
      .then(() => {
        setIsConnected(true);
        console.log("SignalR connection established");
      })
      .catch((err) => {
        console.error("Error connecting to SignalR:", err);
      });

    return () => {
      newConnection.stop();
    };
  }, [referenceId, setMessages, setCurrentChatId, setChatRooms, setMessage]);

  const initializeConnection = (user1Id?: string, user2Id?: string) => {
    const newReferenceId = `${user1Id}|||${user2Id}`;
    setReferenceId(newReferenceId);
  };

  const getChatHistory = (userId?: string) => {
    if (connection && isConnected) {
      connection.invoke("GetChatHistory", userId);
    }
  };

  const getUserChatRooms = (userId?: string) => {
    if (connection && isConnected) {
      connection.invoke("GetUserChatRooms", userId);
    }
  };

  const createOrJoinRoom = async (user1Id?: string, user2Id?: string) => {
    if (connection && isConnected) {
      await connection.invoke("CreateOrJoinRoom", user1Id, user2Id);
    }
  };

  const sendMessage = async (
    chatId: string,
    senderId: string,
    receiverId: string,
    content: string,
  ) => {
    if (connection && isConnected) {
      try {
        await connection.invoke(
          "SendMessage",
          chatId,
          senderId,
          receiverId,
          content,
        );
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  useEffect(() => {
    if (referenceId) {
      startConnection();
    }
  }, [referenceId]);

  return {
    initializeConnection,
    getChatHistory,
    getUserChatRooms,
    createOrJoinRoom,
    sendMessage,
    isConnected,
  };
};

export default useChat;

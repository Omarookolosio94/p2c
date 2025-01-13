import { HubConnection } from "@microsoft/signalr";
import { StateCreator } from "zustand";

type State = {
  connection: HubConnection | null;
  chatRooms: ChatRoom[];
  currentChatId: string | null;
  messages: Message[];
  chatLoading: boolean;
};

type Actions = {
  setMessage: (message: Message) => void;
  setChatRooms: (chatRooms: ChatRoom[]) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentChatId: (chatId: string) => void;
};

export const defaultChatRoomState: State = {
  connection: null,
  chatRooms: [],
  currentChatId: null,
  messages: [],
  chatLoading: false,
};

export type ChatRoomSlice = State & Actions;

export const createChatRoomSlice: StateCreator<
  ChatRoomSlice,
  [],
  [],
  ChatRoomSlice
> = (set) => ({
  ...defaultChatRoomState,
  setMessage: (message) => {
    console.log("zustand", message);

    set((state) => ({
      messages: [
        ...state.messages.filter(
          (x) =>
            x.messageId !== message?.messageId || x.chatId !== message?.chatId,
        ),
        message,
      ],
    }));
  },
  setChatRooms: (chatRooms: ChatRoom[]) => {
    set({ chatRooms });
  },
  setMessages: (messages: Message[]) => {
    set({ messages });
  },
  setCurrentChatId: (chatId: string) => {
    set({ currentChatId: chatId });
  },
});

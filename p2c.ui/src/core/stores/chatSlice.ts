import { StateCreator } from "zustand";

type State = {
  chatrooms: Chat[];
  messages: Message[];
  chatLoading: boolean;
};

type Actions = {
  resetChat: () => void;
};

export const defaultChatState: State = {
  chatrooms: [],
  messages: [],
  chatLoading: false,
};

export type ChatSlice = State & Actions;

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (
  set,
) => ({
  ...defaultChatState,
  resetChat: () => {
    set({ ...defaultChatState });
  },
});

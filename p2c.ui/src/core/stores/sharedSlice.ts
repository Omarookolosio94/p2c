import { StateCreator } from "zustand";
import { defaultUserState, UserSlice } from "./userSlice";
import { ChatRoomSlice, defaultChatRoomState } from "./chatRoomSlice";

type State = {
  isProfileOpen: boolean;
};

type Actions = {
  reset: () => void;
  toggleProfile: () => void;
  isLoading: () => boolean;
};

const defaultSharedState = {
  isProfileOpen: false,
};

export type SharedSlice = Actions & State;

export const createSharedSlice: StateCreator<
  UserSlice & ChatRoomSlice & State,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  ...defaultSharedState,
  isLoading: () => {
    return get().chatLoading || get().userLoading;
  },
  toggleProfile: () => {
    set((state) => ({
      isProfileOpen: get().singleUser == null ? false : !state.isProfileOpen,
    }));
  },
  reset() {
    set({
      ...defaultSharedState,
      ...defaultChatRoomState,
      ...defaultUserState,
    });
    sessionStorage.removeItem("p2c.store");
  },
});

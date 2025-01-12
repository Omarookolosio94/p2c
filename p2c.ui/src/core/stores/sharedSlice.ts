import { StateCreator } from "zustand";
import { defaultUserState, UserSlice } from "./userSlice";
import { ChatSlice, defaultChatState } from "./chatSlice";

type State = {
  isNavOpen: boolean;
};

type Actions = {
  reset: () => void;
  toggleNav: () => void;
  isLoading: () => boolean;
};

const defaultSharedState = {
  isNavOpen: false,
};

export type SharedSlice = Actions & State;

export const createSharedSlice: StateCreator<
  UserSlice & ChatSlice & State,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  ...defaultSharedState,
  isLoading: () => {
    return get().chatLoading || get().userLoading;
  },
  toggleNav: () => {
    set((state) => ({ isNavOpen: !state.isNavOpen }));
  },
  reset() {
    set({ ...defaultSharedState, ...defaultChatState, ...defaultUserState });
    sessionStorage.removeItem("p2c.store");
  },
});

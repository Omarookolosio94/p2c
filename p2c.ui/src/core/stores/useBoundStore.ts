import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./userSlice";
import { createSharedSlice, SharedSlice } from "./sharedSlice";
import { ChatRoomSlice, createChatRoomSlice } from "./chatRoomSlice";

export const useBoundStore = create<UserSlice & ChatRoomSlice & SharedSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createChatRoomSlice(...a),
        ...createSharedSlice(...a),
      }),
      {
        name: "p2c.store",
        storage: createJSONStorage(() => sessionStorage),
        skipHydration: false,
      },
    ),
  ),
);

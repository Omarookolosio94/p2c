import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./userSlice";
import { ChatSlice, createChatSlice } from "./chatSlice";
import { createSharedSlice, SharedSlice } from "./sharedSlice";

export const useBoundStore = create<UserSlice & ChatSlice & SharedSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createChatSlice(...a),
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

import { StateCreator } from "zustand";
import toast from "react-hot-toast";
import { AuthData, NewUser } from "../types/user";
import {
  getAllUsers,
  getUsersById,
  loginUser,
  registerNewUser,
} from "../api/user.api";
import { ChatRoomSlice } from "./chatRoomSlice";

type State = {
  currentUser: User | null;
  users: User[];
  singleUser: User | null;
  userLoading: boolean;
};

type Actions = {
  resetUser: () => void;
  login: (authData: AuthData) => Promise<ApiResponse>;
  getUsers: () => Promise<void>;
  getUserById: (userId: string) => Promise<void>;
  resetProfile: () => void;
  register: (newUser: NewUser) => Promise<ApiResponse>;
};

export const defaultUserState: State = {
  currentUser: null,
  userLoading: false,
  singleUser: null,
  users: [],
};

export type UserSlice = State & Actions;

export const createUserSlice: StateCreator<
  UserSlice & ChatRoomSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  ...defaultUserState,
  login: async (authData) => {
    set({ userLoading: true });

    const res: ApiResponse = await loginUser(authData);

    if (res?.status) {
      set({ currentUser: res?.data as User });
      toast.success(res.message!);
    } else {
      toast.error(res.message!);
    }

    set({ userLoading: false });
    return res;
  },
  register: async (newUser) => {
    const res: ApiResponse = await registerNewUser(newUser);

    if (res?.status) {
      set({ currentUser: res?.data as User });
      toast.success(res.message!);
    } else {
      toast.error(res.message!);
    }

    set({ userLoading: false });
    return res;
  },
  getUsers: async () => {
    set({ userLoading: true });
    const res = await getAllUsers();
    set({ users: res?.data, userLoading: false });
  },
  getUserById: async (userId) => {
    set({ userLoading: true });
    const res = await getUsersById(userId);
    set({ singleUser: res?.data, userLoading: false });
  },
  resetProfile: () => {
    set({ singleUser: null });
  },
  resetUser: () => {
    set({ ...defaultUserState });
  },
});

import { StateCreator } from "zustand";
import toast from "react-hot-toast";
import { AuthData, NewUser } from "../types/user";
import { fakeUser, generateFakeUsers } from "../utilities/mocks";

type State = {
  user: User | null;
  contacts: User[];
  contactProfile: User | null;
  userLoading: boolean;
};

type Actions = {
  resetUser: () => void;
  login: (authData: AuthData) => Promise<ApiResponse>;
  getContacts: () => Promise<void>;
  getContactProfile: () => Promise<void>;
  resetProfile: () => void;
  register: (newUser: NewUser) => Promise<ApiResponse>;
};

export const defaultUserState: State = {
  user: null,
  userLoading: false,
  contactProfile: null,
  contacts: [],
};

export type UserSlice = State & Actions;

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  ...defaultUserState,
  login: async (authData) => {
    console.log(authData);

    const res: ApiResponse = {
      status: true,
      data: "",
      message: "Login successful",
    };

    // TODO: Complete

    toast.success(res.message!);
    return res;
  },
  register: async (newUser) => {
    console.log(newUser);

    // TODO: Complete register
    const res: ApiResponse = {
      status: true,
      data: "",
      message: "OTP has been sent to your email.",
    };

    toast.success(res.message!);
    return res;
  },
  getContacts: async () => {
    set({ userLoading: true });

    setTimeout(() => {
      const data = generateFakeUsers(8);

      set({
        userLoading: false,
        contacts: data,
      });
    }, 1000);
  },
  getContactProfile: async () => {
    set({ userLoading: false });

    setTimeout(() => {
      const data = fakeUser();

      set({
        userLoading: false,
        contactProfile: data,
      });
    }, 1000);
  },
  resetProfile: () => {
    set({ contactProfile: null });
  },
  resetUser: () => {
    set({ ...defaultUserState });
  },
});

import { AuthData, NewUser } from "../types/user";
import { apiCall } from "./apiCall";

export const registerNewUser = (newUser: NewUser) => {
  return apiCall({
    endpoint: "/users",
    method: "POST",
    body: newUser,
  });
};

export const loginUser = (authData: AuthData) => {
  return apiCall({
    endpoint: "/users/auth",
    method: "POST",
    body: authData,
  });
};

export const getUsersById = (userId: string) => {
  return apiCall({
    endpoint: "/users",
    param: userId,
    method: "GET",
  });
};

export const getAllUsers = () => {
  return apiCall({
    endpoint: "/users",
    method: "GET",
  });
};

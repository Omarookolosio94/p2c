import { apiCall } from "./apiCall";

export const signIn = (username: string, password: string) => {
  return apiCall({
    endpoint: "/auth/login",
    method: "POST",
    body: { email_phone: username, password, appVersion: 50000 },
  });
};

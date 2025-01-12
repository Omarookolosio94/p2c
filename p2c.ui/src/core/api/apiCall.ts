import axios, { AxiosRequestConfig, Method, ResponseType } from "axios";

interface Props {
  endpoint: string;
  extra?: string;
  method: Method;
  body?: object;
  pQuery?: Record<string, string | number | boolean> | never;
  param?: string | number;
  multipart?: boolean;
  responseType?: ResponseType;
  auth?: boolean;
  token?: string;
  isBaseUrl?: boolean;
}

export const apiCall = async ({
  endpoint,
  extra = "",
  method = "GET",
  body = {},
  pQuery = {},
  param = "",
  multipart = false,
  responseType = "json",
  auth = false,
  token = "",
}: Props) => {
  const headers: Record<string, string> = {
    "Content-Type": multipart ? "multipart/form-data" : "application/json",
  };

  let url = import.meta.env.VITE_API_URL + endpoint;

  if (extra) {
    url += `/${extra}`;
  }

  if (param) {
    url += `/${param}`;
  }

  if (pQuery) {
    const paramsArray = Object.keys(pQuery)
      .map(
        (key) =>
          pQuery[key] &&
          `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`,
      )
      .filter((item) => item);
    url += `?${paramsArray.join("&")}`;
  }

  if (auth) {
    const bStore = sessionStorage.getItem("brooks.store");

    if (bStore) {
      const authState = JSON.parse(bStore);
      headers.Authorization = `Bearer ${authState?.state?.token}`;
    }
  } else {
    if (token?.length > 1) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const options: AxiosRequestConfig = {
    url,
    method,
    headers,
    responseType,
    data: body,
  };

  try {
    const response = await axios(options);
    return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message === "Network Error") {
      return {
        isSuccessful: false,
        status: error?.status,
        message: "Please check your internet connection",
        data: null,
      };
    }
    return error?.response?.data;
  }
};

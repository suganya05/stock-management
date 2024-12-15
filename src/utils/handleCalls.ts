import { IStatus } from "../types/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from "firebase/auth";
import { toast } from "react-toastify";
import { backend_url } from "../constants/backend";

export const handleError = (error: any, reject: any) => {
  if (error.response) {
    reject({
      type: "server",
      data: error.response.data.message
        ? error.response.data.message
        : "Unknown server error",
    } as IStatus);
  } else if (error.request) {
    reject({
      type: "client",
      data: "Network error: No response from the server",
    } as IStatus);
  } else {
    reject({
      type: "unknown",
      data: error.message,
    } as IStatus);
  }
};

interface AuthOptions {
  user: User | null;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
}

interface NoAuthOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  options?: AxiosRequestConfig;
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export const noAuth = async <T>({
  method,
  url,
  data = {},
  options = {},
}: NoAuthOptions) => {
  try {
    const headers = options?.headers || {};
    delete options.headers;

    const res: AxiosResponse<ApiResponse<T>> = await axios({
      method,
      url: `${backend_url}/${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    });

    // if (!res?.data?.success) {
    //   throw new Error(res?.data?.message || "API request failed");
    // }

    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(errorMessage);
  }
};

export const auth = async <T>({
  user,
  method,
  url,
  data = {},
  options = {},
}: AuthOptions) => {
  try {
    const headers = options?.headers || {};
    delete options.headers;

    const idToken = await user?.getIdToken();

    const res = await axios({
      method,
      url: `${backend_url}/${url}`,
      data,
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    });
    console.log("res data", res.data);

    if (res?.data?.message != "success") {
      console.log("failer for following req", url);
      throw new Error(res?.data?.message || "API request failed");
    }

    return { data: res.data, type: "sucess" } as IStatus;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(errorMessage);
    return { type: "unknown", data: errorMessage } as IStatus;
  }
};

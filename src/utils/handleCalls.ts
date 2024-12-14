import { IStatus } from "../types/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

// export const handleError = (error: any, reject: any) => {
//   if (error.response) {
//     reject({
//       type: "server",
//       data: error.response.data.message ? error.response.data.message : "Unknown server error",
//     } as IStatus);
//   } else if (error.request) {
//     reject({
//       type: "client",
//       data: "Network error: No response from the server",
//     } as IStatus);
//   } else {
//     reject({
//       type: "unknown",
//       data: error.message,
//     } as IStatus);
//   }
// };

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
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
    });

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "API request failed");
    }

    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(errorMessage);
  }
};

export const auth = async <T>({
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
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...options,
      withCredentials: true,
    });

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "API request failed");
    }

    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(errorMessage);
  }
};

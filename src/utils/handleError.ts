import { IStatus } from "../types/types";

export const handleError = (error: any, reject: any) => {
  if (error.response) {
    reject({
      type: "server",
      data: error.response.data.message,
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

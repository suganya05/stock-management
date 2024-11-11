import axios from "axios";
import { backend_url } from "../../../constants/backend";
import { IStatus } from "../../../types/types";
import { User } from "firebase/auth";

export const getTopSelling = async (user: User | null) => {
  return new Promise<IStatus>(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/sales/top-selling`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const response = await axios.get(url, { headers });
      resolve({ type: "sucess", data: response.data } as IStatus);
    } catch (error: any) {
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
    }
  });
};

import { User } from "firebase/auth";
import { IStatus } from "../../../types/types";
import { backend_url } from "../../../constants/backend";
import axios from "axios";

export const getManageSalesPerson = (
  user: User | null,
  year: number,
  month: number,
  day: number
) => {
  return new Promise<IStatus>(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/manage/sales-rep/${year}/${month}/${day}`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.get(url, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
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

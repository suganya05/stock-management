import { User } from "firebase/auth";
import { handleError } from "../utils/handleCalls";
import { backend_url } from "../constants/backend";
import axios from "axios";
import { IStatus } from "../types/types";

export const getSales = (user: User | null): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/sales`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.get(url, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      reject(handleError(error, reject));
    }
  });
};

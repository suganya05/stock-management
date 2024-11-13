import { User } from "firebase/auth";
import { handleError } from "../../../utils/handleError";
import { backend_url } from "../../../constants/backend";
import axios from "axios";
import { IStatus } from "../../../types/types";

export const getDamageProduct = async (
  user: User | null,
  year: number,
  month: number,
  page: number,
  limit: number
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/products/damage-product/${year}/${month}/?page=${page}?limit=${limit}`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.get(url, { headers });
      resolve({ data: res.data, type: "sucess" } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

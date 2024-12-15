import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";
import { IStatus } from "../../../types/types";

export const getDamageProduct = async (
  user: User | null,
  year: number,
  month: number,
  page: number,
  limit: number
): Promise<IStatus> => {
  const url = `admin/products/damage-product/${year}/${month}/?page=${page}?limit=${limit}`;
  const res = await auth({ user: user, method: "GET", url: url });
  return res;
};

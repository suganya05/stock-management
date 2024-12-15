import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";

export const getMonetoryStat = async (user: User | null) => {
  const url = `admin/sales/monitory-stat`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

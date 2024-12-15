import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";

export const getTopClients = async (user: User | null) => {
  const url = `admin/sales/top-client`;
  const res = auth({ user, method: "GET", url });
  return res;
};

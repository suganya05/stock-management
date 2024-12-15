import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";

export const getTopSelling = async (user: User | null) => {
  const url = `admin/sales/top-selling`;
  const response = await auth({ user, method: "GET", url });
  return response;
};

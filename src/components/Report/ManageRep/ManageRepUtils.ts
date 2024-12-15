import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";

export const getManageSalesPerson = async (
  user: User | null,
  year: number,
  month: number,
  day: number
) => {
  const url = `admin/manage/sales-rep/${year}/${month}/${day}`;
  const res = await auth({ url, method: "GET", user });
  return res;
};

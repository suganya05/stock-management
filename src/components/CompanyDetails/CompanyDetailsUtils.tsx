import { User } from "firebase/auth";
import { auth } from "../../utils/handleCalls";

export const getDamagedProduct = async (
  user: User | null,
  unitId: string,
  page: number,
  limit: number
) => {
  const url = `admin/manage/outlet/damaged/${unitId}?page=${page}?limit=${limit}`;
  const res = await auth({ user: user, method: "GET", url });
  return res;
};

export const getTransactionHistory = async (
  user: User | null,
  unitId: string,
  page: number,
  limit: number
) => {
  const url = `admin/manage/outlet/transactions/${unitId}?page=${page}&limit=${limit}`;
  const res = await auth({ user: user, method: "GET", url });
  return res;
};

export const getUnPaid = async (
  user: User | null,
  outletId: string,
  page: number,
  limit: number
) => {
  const url = `admin/manage/outlet/transactions/pendings/${outletId}?page=${page}?limit=${limit}`;
  const res = auth({ user, method: "GET", url });
  return res;
};

export const getSalesForOutlet = async (
  user: User | null,
  outletId: string
) => {
  const url = `admin/manage/outlet/monitory/${outletId}`;
  const res = await auth({ user, method: "GET", url });
  return res;
};

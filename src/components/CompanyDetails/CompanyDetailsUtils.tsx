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
  limit: number,
  startDate: Date,
  endDate: Date
) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();
  // const url = `admin/manage/outlet/transactions/${unitId}?page=${page}&limit=${limit}`;
  const url = `admin/manage/outlet/transactions/${unitId}/${startDay}/${startMonth}/${startYear}/${endDay}/${endMonth}/${endYear}?page=${page}&limit=${limit}`;
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

export const getTransactionHistoryDetails = async (
  user: User | null,
  unitId: string,
  page: number,
  limit: number
) => {
  const url = `admin/manage/outlet/transactions/${unitId}?page=${page}&limit=${limit}`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

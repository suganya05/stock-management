import axios from "axios";
import { backend_url } from "../../constants/backend";
import { IStatus } from "../../types/types";
import { User } from "firebase/auth";

export const getDamagedProduct = async (
  user: User | null,
  unitId: string,
  page: number,
  limit: number
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/manage/outlet/damaged/${unitId}?page=${page}?limit=${limit}`;
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

export const getTransactionHistory = (user: User | null, unitId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/transactions/${unitId}`;
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

export const getUnPaid = async (
  user: User | null,
  outletId: string,
  page: number,
  limit: number
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/manage/outlet/transactions/pendings/${outletId}?page=${page}?limit=${limit}`;
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

import { User } from "firebase/auth";
import { IAllocate, IStatus, IStockItem } from "../types/types";
import { backend_url } from "../constants/backend";
import axios from "axios";
import Papa from "papaparse";
import { handleError } from "../utils/handleError";
import { ParseFile } from "../utils/handleFile";

export const createAllocation = async (
  user: User | null,
  salesPersonId: string,
  allocatedItems: IStockItem[]
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/allocations`;
      const data = {
        salesPersonId: salesPersonId,
        items: allocatedItems,
      };
      // console.log("allocated items", allocatedItems);
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };

      const res = await axios.post(url, data, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const getAllocation = async (user: User | null): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const url = `${backend_url}/admin/allocations`;
      const res = await axios.get(url, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const deleteAllocation = async (
  user: User | null,
  salesPersonId: string,
  productId: string
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const url = `${backend_url}/admin/allocations/${salesPersonId}/${productId}`;

      const res = await axios.delete(url, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      reject(handleError(error, reject));
    }
  });
};
export const handleUploadCsv = async (
  user: User | null,
  file: File
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileData = await ParseFile(file);
      const data = fileData.data.map((row: any) => {
        return {
          salesPersonId: row["Sales Person Id"],
          productId: row["Product Id"],
          quantity: row["Quantity"],
        };
      });
      console.log(fileData);
      const url = `${backend_url}/admin/allocations/bulk`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.post(url, { data: data }, { headers });
      console.log(res.data);
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const PreviousStock = async (user: User | null) => {
  try {
    const url = `${backend_url}/admin/allocations/use-existing`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, undefined, { headers });
    console.log("exisitngf", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

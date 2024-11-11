import {
  EmailAuthCredential,
  reauthenticateWithRedirect,
  User,
} from "firebase/auth";
import { backend_url } from "../constants/backend";
import axios from "axios";
import { IGetStockItem, IStatus, IStockItem } from "../types/types";
import Papa from "papaparse";
import { handleError } from "../utils/handleError";
import { ParseFile } from "../utils/handleFile";

export const createStock = async (
  user: User | null,
  stockData: IStockItem
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const url = `${backend_url}/admin/stocks`;
      const data = {
        productId: stockData.productId,
        quantity: stockData.quantity,
      };
      const res = await axios.post(url, data, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const getStocks = async (user: User | null): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/stocks`;
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

export const deleteStock = async (user: User | null, productId: string) => {
  try {
    const url = `${backend_url}/admin/stocks/${productId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.delete(url, { headers });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const updateStockBck = async (
  user: User | null,
  updateStockItem: IStockItem
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/stocks/${updateStockItem.productId}`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const data = {
        quantity: updateStockItem.quantity,
      };
      const res = await axios.put(url, data, { headers });
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const parseAndUploadCSV = async (
  user: User | null,
  file: File
): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    let fileData: any;
    try {
      fileData = await ParseFile(file);
    } catch (error) {
      reject({ data: "Parsing file failed", type: "client" } as IStatus);
      return;
    }
    try {
      const url = `${backend_url}/admin/stocks/multiple`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const products = fileData.data.map((row: any) => ({
        productId: row["Product ID"],
        quantity: row["Quantity"],
      }));

      const data = {
        items: products,
      };
      console.log("givining to server");
      const res = await axios.post(url, data, { headers });
      console.log("i am server");
      resolve({ type: "sucess", data: res.data } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

export const existingStockBck = async (user: User | null) => {
  try {
    const url = `${backend_url}/admin/stocks/use-existing-stock`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const res = await axios.post(url, undefined, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAll = async (user: User | null): Promise<IStatus> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${backend_url}/admin/stocks/all`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.delete(url, { headers });
      resolve({ type: "sucess", data: res.status } as IStatus);
    } catch (error) {
      handleError(error, reject);
    }
  });
};

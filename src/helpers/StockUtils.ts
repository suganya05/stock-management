import { User } from "firebase/auth";
import { IStatus, IStockItem } from "../types/types";
import Papa from "papaparse";
import { auth, handleError } from "../utils/handleCalls";
import { ParseFile } from "../utils/handleFile";
import Revenue from "../components/Report/Revenue";
import { toast } from "react-toastify";

export const createStock = async (user: User | null, stockData: IStockItem) => {
  const url = `admin/stocks`;
  const data = {
    productId: stockData.productId,
    quantity: stockData.quantity,
  };
  const res = await auth({ method: "POST", url, data, user });
  return res;
};

export const getStocks = async (user: User | null) => {
  const url = `admin/stocks`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

export const deleteStockold = async (user: User | null, productId: string) => {
  const url = `admin/stocks/${productId}`;
  const res = await auth({ method: "DELETE", url, user });
  return res;
};

export const deleteStock = async (user: User | null, productId: string) => {
  const url = `admin/stocks/${productId}`;
  const res = await auth({ method: "DELETE", user, url });
  return res;
};

export const updateStockBck = async (
  user: User | null,
  updateStockItem: IStockItem
) => {
  const url = `admin/stocks/${updateStockItem.productId}`;
  const data = {
    quantity: updateStockItem.quantity,
  };
  const res = await auth({ method: "PUT", url, data, user });
  return res;
};

export const parseAndUploadCSV = async (user: User | null, file: File) => {
  let fileData: any;
  try {
    fileData = await ParseFile(file);
  } catch (error) {
    // reject({ data: "Parsing file failed", type: "client" } as IStatus);
    toast.error("Error parsing file");
    return { type: "client", data: "Error parsing file" } as IStatus;
  }
  const url = `admin/stocks/multiple`;
  const products = fileData.data.map((row: any) => ({
    productId: row["Product ID"],
    quantity: row["Quantity"],
  }));

  const data = {
    items: products,
  };
  const res = await auth({ method: "POST", url, data, user });
  return res;
};

export const existingStockBck = async (user: User | null) => {
  const url = `admin/stocks/use-existing-stock`;
  const res = await auth({ url, method: "POST", user });
  return res.data;
};

export const deleteAll = async (user: User | null) => {
  const url = `admin/stocks/all`;
  const res = await auth({ method: "DELETE", url, user });
  return res;
};

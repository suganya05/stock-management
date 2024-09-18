import { User } from "firebase/auth";
import { backend_url } from "../constants/backend";
import axios from "axios";
import { IGetStock, IGetStockItem, IStockItem } from "../types/types";
import Papa from "papaparse";

export const createStock = async (
  user: User | null,
  date: Date,
  stockData: IStockItem
) => {
  try {
    const url = `${backend_url}admin/stocks`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const data = {
      productId: stockData.productId,
      quantity: stockData.quantity,
      date: `${year}-${month}-${day}`,
    };

    const res = await axios.post(url, data, { headers });
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getStocks = async (user: User | null, date?: Date) => {
  try {
    let day, month, year;
    if (date) {
      day = date.getDate();
      month = date.getMonth() + 1;
      year = date.getFullYear();
    } else {
      const date = new Date();
      day = date.getDate();
      month = date.getMonth() + 1;
      year = date.getFullYear();
    }
    const url = `${backend_url}admin/stocks?date=${year}-${month}-${day}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.get(url, { headers });
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteStock = async (
  user: User | null,
  productId: string,
  date: Date
) => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${backend_url}admin/stocks/${productId}?date=${year}-${month}-${day}`;
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
  updateStockItem: IStockItem,
  date: Date
) => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${backend_url}admin/stocks/${updateStockItem.productId}?date=${year}-${month}-${day}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const data = {
      quantity: updateStockItem.quantity,
    };
    const res = await axios.put(url, data, { headers });
    return { data: res.data.stock, status: res.status };
  } catch (error) {
    console.log(error);
  }
};

const convertCsvToJson = (data: any[]): IStockItem[] => {
  return data.map((row: any) => {
    return {
      productId: row["Product ID"] as string,
      quantity: row["Quantity"] as number,
    };
  });
};

export const parseAndUploadCSV = async (
  user: User | null,
  file: File,
  date: Date
): Promise<Partial<IGetStock> | undefined> => {
  return new Promise<Partial<IGetStock>>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        const jsonData = convertCsvToJson(result.data);

        try {
          let lastCreatedStock;

          for (const stock of jsonData) {
            const newStock = await createStock(user, date, stock);
            if (newStock && newStock.status === 200) {
              lastCreatedStock = newStock.data;
            }
          }

          resolve(lastCreatedStock);
        } catch (error) {
          console.error("Failed to upload stock:", error);
          reject(error);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

export const existingStockBck = async (user: User | null) => {
  try {
    const url = `${backend_url}admin/stocks/use-existing-stock`;
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

export const deleteAll = async (user: User | null, date: Date) => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const url = `${backend_url}admin/stocks/all?date=${year}-${month}-${day}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.delete(url, { headers });
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

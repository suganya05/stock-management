import { User } from "firebase/auth";
import { backend_url } from "../constants/backend";
import axios from "axios";
import { IGetStock, IStockItem } from "../types/types";

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
    return res.data;
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
    return res.data;
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
    return;
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

    const url = `${backend_url}admin/stocks/${updateStockItem.productId}?=date${year}-${month}-${day}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    const data = {
      quantity: updateStockItem.quantity,
    };
    const res = await axios.put(url, data, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

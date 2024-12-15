import { User } from "firebase/auth";
import { create } from "zustand";
import {
  createStock,
  deleteAll,
  deleteStock,
  getStocks,
  parseAndUploadCSV,
  updateStockBck,
} from "../helpers/StockUtils";
import { IGetStockItem, IStatus, IStock, IStockItem } from "../types/types";

interface StockStore {
  stocks: IGetStockItem[];
  fetchStocks: (user: User | null) => Promise<IStatus>;
  addStock: (user: User | null, stock: IStockItem) => Promise<IStatus>;
  removeStock: (user: User | null, productId: string) => Promise<IStatus>;
  updateStock: (
    user: User | null,
    updatedStock: IStockItem
  ) => Promise<IStatus>;
  uploadCSV: (user: User | null, file: File) => void;
  clearAllStock: (user: User | null) => void;
}

const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],

  fetchStocks: async (user) => {
    if (user) {
      const result = await getStocks(user);
      if (result.type == "sucess") {
        set({ stocks: result.data?.data });
        return { type: result.type, data: result.data.data } as IStatus;
      } else {
        return { type: "unknown", data: "failed" } as IStatus;
      }
    } else {
      return { type: "client", data: "Invalid token" } as IStatus;
    }
  },

  addStock: async (user, stock) => {
    const data = await createStock(user, stock);
    if (data.type === "sucess") {
      set((state) => {
        console.log("state stocks", state.stocks);
        console.log("data stock", data.data);
        let updatedStock = [...state.stocks];
        const newStock = updatedStock.map((item) => {
          if (item.product._id == data.data.data.product._id) {
            item.quantity = data.data.data.stocks.quantity;
          }
          return item;
        });

        const productExists = newStock.some(
          (f) => f.product._id == data.data.data.product._id
        );

        const finalStock = productExists
          ? newStock
          : [...newStock, data.data.data];
        return { ...state, stocks: finalStock };
      });

      return { type: data.type, data: "Success" } as IStatus;
    } else {
      return { type: data.type, data: "Failed" } as IStatus;
    }
  },

  removeStock: async (user, productId) => {
    try {
      const result = await deleteStock(user, productId);
      set((state) => {
        if (state.stocks) {
          const newStock = state.stocks.filter(
            (f) => f.product._id != productId
          );
          return { ...state, stocks: newStock };
        } else {
          return state;
        }
      });
      return { type: result.type, data: result.data } as IStatus;
    } catch (error: any) {
      return { type: error.type, data: error.data } as IStatus;
    }
  },

  updateStock: async (user, updatedStockItem) => {
    try {
      const updatedStockResponse = await updateStockBck(user, updatedStockItem);
      set((state) => {
        const newStock = state.stocks.map((item) => {
          if (item.product._id === updatedStockItem.productId) {
            return { ...item, quantity: updatedStockItem.quantity };
          }
          return item;
        });
        return { ...state, stocks: newStock };
      });
      return {
        type: updatedStockResponse.type,
        data: updatedStockResponse.data,
      } as IStatus;
    } catch (error: any) {
      return { type: error.type, data: error.data } as IStatus;
    }
  },
  uploadCSV: async (user, file) => {
    try {
      const result = await parseAndUploadCSV(user, file);
      get().fetchStocks(user);
      return { type: result.type, data: result.data } as IStatus;
    } catch (error: any) {
      return { type: error.type, data: error.data } as IStatus;
    }
  },
  clearAllStock: async (user) => {
    try {
      const res = await deleteAll(user);
      set((state) => {
        return { stocks: { ...state.stocks, stocks: [] } };
      });
      return { type: res.type, data: res.data } as IStatus;
    } catch (error: any) {
      return { type: error.type, data: error.data } as IStatus;
    }
  },
}));

export default useStockStore;

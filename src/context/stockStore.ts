import { User } from "firebase/auth";
import { create } from "zustand";
import {
  createStock,
  deleteAll,
  deleteStock,
  existingStockBck,
  getStocks,
  parseAndUploadCSV,
  updateStockBck,
} from "../helpers/StockUtils";
import { IGetStockItem, IStock, IStockItem } from "../types/types";

interface StockStore {
  stocks: IGetStockItem[];
  fetchStocks: (user: User | null) => Promise<void>;
  addStock: (user: User | null, stock: IStockItem) => void;
  removeStock: (user: User | null, productId: string) => void;
  updateStock: (user: User | null, updatedStock: IStockItem) => void;
  uploadCSV: (user: User | null, file: File) => void;
  clearAllStock: (user: User | null) => void;
}

const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],

  fetchStocks: async (user) => {
    if (user) {
      try {
        const result = await getStocks(user);
        console.log("stocks", result.data);
        set({ stocks: result.data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  addStock: async (user, stock) => {
    try {
      const data = await createStock(user, stock);
      console.log(data.data.stocks);
      set((state) => {
        let updatedStock = [...state.stocks];
        const newStock = updatedStock.map((item) => {
          if (item.product._id == data.data.stocks.product._id) {
            item.quantity = data.data.stocks.quantity;
          }
          return item;
        });

        const productExists = newStock.some(
          (f) => f.product._id == data.data.stocks.product._id
        );

        const finalStock = productExists
          ? newStock
          : [...newStock, data.data.stocks];
        return { ...state, stocks: finalStock };
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeStock: async (user, productId) => {
    try {
      await deleteStock(user, productId);
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
    } catch (error) {
      console.log(error);
    }
  },

  updateStock: async (user, updatedStockItem) => {
    try {
      const updatedStockResponse = await updateStockBck(user, updatedStockItem);
      if (updatedStockResponse.type === "sucess") {
        set((state) => {
          const newStock = state.stocks.map((item) => {
            if (item.product._id === updatedStockItem.productId) {
              return { ...item, quantity: updatedStockItem.quantity };
            }
            return item;
          });
          return { ...state, stocks: newStock };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadCSV: async (user, file) => {
    try {
      await parseAndUploadCSV(user, file);
      get().fetchStocks(user);
    } catch (error) {
      console.log(error);
    }
  },
  clearAllStock: async (user) => {
    try {
      const res = await deleteAll(user);
      if (res.type === "sucess") {
        set((state) => {
          return { stocks: { ...state.stocks, stocks: [] } };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useStockStore;

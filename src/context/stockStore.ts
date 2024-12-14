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
  updateStock: (user: User | null, updatedStock: IStockItem) => Promise<IStatus>;
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
        return {type: result.type, data: result.data} as IStatus
      } catch (error : any) {
        return {type: error.type, data: error.data} as IStatus
      }
    }
    else{
      return {type: "client", data: "Invalid token"} as IStatus
    }
  },

  addStock: async (user, stock) => {
    try {
      const data = await createStock(user, stock);
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

      return {type: data.type, data: "Success"} as IStatus 
    } catch (error : any) {
      return {type: error.type, data : error.data} as IStatus
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
      return {type: result.type, data: result.data} as IStatus
    } catch (error : any) {
      return {type: error.type, data: error.data} as IStatus
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
      return {type: updatedStockResponse.type, data : updatedStockResponse.data} as IStatus
    } catch (error : any) {
      return {type: error.type, data : error.data} as IStatus
    }
  },
  uploadCSV: async (user, file) => {
    try {
      const result = await parseAndUploadCSV(user, file);
      get().fetchStocks(user);
      return {type: result.type,data : result.data} as IStatus
    } catch (error : any) {
      return {type: error.type,data : error.data} as IStatus
    }
  },
  clearAllStock: async (user) => {
    try {
      const res = await deleteAll(user);
        set((state) => {
          return { stocks: { ...state.stocks, stocks: [] } };
        });
        return {type: res.type, data: res.data} as IStatus
    } catch (error : any) {
      return {type: error.type, data: error.data} as IStatus
    }
  },
}));

export default useStockStore;

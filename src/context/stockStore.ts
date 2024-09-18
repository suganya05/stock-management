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
} from "../helpers/addStock";
import { IGetStock, IGetStockItem, IStock, IStockItem } from "../types/types";

interface StockStore {
  stocks: Partial<IGetStock>;
  date: Date | undefined;
  setDate: (user: User | null, date: Date) => void;
  fetchStocks: (user: User | null) => Promise<void>;
  addStock: (user: User | null, stock: IStockItem) => void;
  removeStock: (user: User | null, productId: string) => void;
  updateStock: (user: User | null, updatedStock: IStockItem) => void;
  uploadCSV: (user: User | null, file: File) => void;
  existingStock: (user: User | null) => void;
  clearAllStock: (user: User | null) => void;
}

const useStockStore = create<StockStore>((set, get) => ({
  stocks: {},

  date: undefined,

  setDate: (user: User | null, date: Date) => {
    if (!user) {
      return;
    }
    set((state) => {
      if (state.date?.toDateString() === date.toDateString()) {
        return { date: state.date };
      } else {
        set({ date: date });
        get().fetchStocks(user);
        return { date: date };
      }
    });
  },

  fetchStocks: async (user) => {
    if (user) {
      try {
        const date = get().date;
        if (!date) {
          return;
        }
        const result = await getStocks(user, date);

        if (result) {
          if (result.status === 200) {
            set((state) => ({ stocks: result.data.stock }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  addStock: async (user, stock) => {
    try {
      const date = get().date;
      if (date) {
        const data = await createStock(user, date, stock);
        if (data) {
          if (data.status === 200 || 201) {
            set((state) => ({ stocks: data.data }));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  removeStock: async (user, productId) => {
    try {
      const date = get().date;
      if (!date) {
        console.log("Date not set");
        return;
      }
      const status = await deleteStock(user, productId, date);
      if (status === 200) {
        set((state) => {
          if (state.stocks.stocks) {
            const filter = state.stocks.stocks.filter((f) => {
              return f.productId._id !== productId;
            });
            console.log(filter);
            return { stocks: { ...state.stocks, stocks: filter } };
          }
          return { stocks: { ...state.stocks } };
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateStock: async (user, updatedStockItem) => {
    try {
      const date = get().date;
      if (!date) {
        console.log("Date not set");
        return;
      }
      const updatedStockResponse = await updateStockBck(
        user,
        updatedStockItem,
        date
      );
      if (updatedStockResponse && updatedStockResponse.status === 200) {
        set((state) => {
          if (state.stocks.stocks) {
            const updatedStocks = state.stocks.stocks.map((stock) => {
              if (stock.productId._id === updatedStockItem.productId) {
                return { ...stock, quantity: updatedStockItem.quantity };
              }
              return stock;
            });

            return { stocks: { ...state.stocks, stocks: updatedStocks } };
          }
          return state;
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadCSV: async (user, file) => {
    try {
      const date = get().date;
      if (!date) {
        console.log("date not set");
        return;
      }
      const data = (await parseAndUploadCSV(user, file, date)) as any;
      set({ stocks: data });
    } catch (error) {
      console.log(error);
    }
  },

  existingStock: async (user) => {
    try {
      const data = await existingStockBck(user);
      console.log("data from exisitng stock", data);
      set({ stocks: data });
    } catch (error) {
      console.log(error);
    }
  },
  clearAllStock: async (user) => {
    try {
      const date = get().date;
      if (!date) {
        console.log("date not set");
        return;
      }
      const status = await deleteAll(user, date);
      if (status === 200) {
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

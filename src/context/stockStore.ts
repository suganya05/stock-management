import { User } from "firebase/auth";
import { create } from "zustand";
import {
  createStock,
  deleteStock,
  getStocks,
  updateStockBck,
} from "../helpers/addStock";
import { IGetStock, IGetStockItem, IStock, IStockItem } from "../types/types";

interface StockStore {
  stocks: Partial<IGetStock>[];
  fetchStocks: (user: User | null, date?: Date) => Promise<void>;
  addStock: (user: User | null, stock: IStockItem, date: Date) => void;
  removeStock: (user: User | null, productId: string, date: Date) => void;
  updateStock: (
    user: User | null,
    updatedStock: IStockItem,
    date: Date
  ) => void;
  getStockForDay: (
    user: User | null,
    date: Date
  ) => Promise<Partial<IGetStock> | undefined>;
}

const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],

  fetchStocks: async (user, date) => {
    if (user) {
      try {
        const data = await getStocks(user, date);
        set((state) => ({ stocks: [...state.stocks, data.stock] }));
      } catch (error) {
        console.log(error);
      }
    }
  },

  addStock: async (user, stock, date) => {
    try {
      const data = await createStock(user, date, stock);

      set((state) => {
        const existingStockIndex = state.stocks.findIndex((s) => {
          if (s.allotedDate) {
            const newDate = new Date(s.allotedDate);
            return newDate.toDateString() === date.toDateString();
          } else {
            return false;
          }
        });

        if (existingStockIndex === -1) {
          return { stocks: [...state.stocks, data] };
        } else {
          const updatedStocks = [...state.stocks];

          if (updatedStocks[existingStockIndex].stocks) {
            const existingStocks = [
              //@ts-ignore
              ...updatedStocks[existingStockIndex].stocks,
            ];

            existingStocks.push(data.stocks[data.stocks.length - 1]);

            updatedStocks[existingStockIndex] = {
              ...updatedStocks[existingStockIndex],
              stocks: existingStocks,
            };

            return { stocks: updatedStocks };
          } else {
            console.log("returning emy");
            return { stocks: state.stocks };
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeStock: async (user, productId, date) => {
    try {
      console.log("removing");
      await deleteStock(user, productId, date);
      console.log("removed in backend");

      set((state) => ({
        stocks: state.stocks.map((stock) => {
          if (stock.allotedDate) {
            const newDate = new Date(stock.allotedDate);
            if (newDate.toDateString() === date.toDateString()) {
              const filteredStocks = stock.stocks?.filter((s) => {
                return typeof s.productId === "string"
                  ? s.productId !== productId
                  : s.productId._id !== productId;
              });

              console.log("filtered stocks", filteredStocks);
              return { ...stock, stocks: filteredStocks };
            }
          }
          return stock;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateStock: async (user, updatedStockItem, date) => {
    try {
      const updatedStock = await updateStockBck(user, updatedStockItem, date);
      console.log("updated stocks", updatedStock);
      // set((state) => ({
      //   stocks: state.stocks.map((stock) =>
      //     stock._id === stockId ? { ...stock, ...updatedStock } : stock
      //   ),
      // }));
    } catch (error) {
      console.log(error);
    }
  },

  getStockForDay: async (user, date) => {
    const stateStocks = get().stocks;
    if (stateStocks.length < 1) {
      console.log("state stocks is undefined");
      return;
    }

    const stocksForDay = stateStocks.find((f) => {
      if (f.allotedDate) {
        const newDate = new Date(f.allotedDate);
        return newDate.toDateString() === date.toDateString();
      } else {
        return false;
      }
    });

    if (stocksForDay) {
      return stocksForDay;
    } else {
      try {
        await get().fetchStocks(user, date);
        const updatedStocks = get().stocks;
        console.log("updated stocks", updatedStocks);
        const fetchedStockForDay = updatedStocks.find((f) => {
          if (f.allotedDate) {
            const newDate = new Date(f.allotedDate);
            return newDate.toDateString() === date.toDateString();
          } else {
            return false;
          }
        });
        return fetchedStockForDay ? fetchedStockForDay : undefined;
      } catch (error) {
        console.log(error);
      }
    }
  },
}));

export default useStockStore;

import { User } from "firebase/auth";
import { create } from "zustand";
import { ISales } from "../types/types";
import { getSales } from "../helpers/Sales";

interface ISalesRecord {
  sales: ISales[];
  fetchSales: (user: User | null) => void;
}

const useSalesStore = create<ISalesRecord>((set) => ({
  sales: [],
  fetchSales: async (user) => {
    try {
      const data = await getSales(user);
      set({ sales: data.data });
      console.log("sales", data.data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useSalesStore;

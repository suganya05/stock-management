import { User } from "firebase/auth";
import { create } from "zustand";
import { ISalesPerson } from "../types/types";
import {
  getSalesReps,
  deleteSalesRep,
  updateSalesRepBck,
  createSalesRep,
} from "../helpers/salesreps";
// import {
//   createSalesRep,
//   deleteSalesRep,
//   getSalesReps,
//   updateSalesRepBck,
// } from "../helpers/salesReps";

interface SalesRepStore {
  salesReps: Partial<ISalesPerson>[];
  fetchSalesReps: (user: User | null) => Promise<void>;
  createSalesRep: (
    user: User | null,
    salesRep: Partial<ISalesPerson>
  ) => Promise<void>;
  removeSalesRep: (user: User | null, salesRepId: string) => void;
  updateSalesRep: (
    user: User | null,
    salesRepId: string,
    updatedSalesRep: Partial<ISalesPerson>
  ) => Promise<any>;
}

const useSalesRepStore = create<SalesRepStore>((set) => ({
  salesReps: [],

  fetchSalesReps: async (user) => {
    if (user) {
      try {
        const data = await getSalesReps(user);
        set({ salesReps: data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  createSalesRep: async (user, salesRep) => {
    try {
      const newSalesRep = await createSalesRep(user, salesRep);
      set((state) => ({
        salesReps: [...state.salesReps, newSalesRep.newSalesPerson],
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  removeSalesRep: async (user, salesRepId) => {
    try {
      await deleteSalesRep(user, salesRepId);
      set((state) => ({
        salesReps: state.salesReps.filter((rep) => rep._id !== salesRepId),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateSalesRep: async (user, salesRepId, updatedSalesRep) => {
    try {
      const fetchedSalesRep = await updateSalesRepBck(
        user,
        salesRepId,
        updatedSalesRep
      );
      console.log(
        "updated",
        fetchedSalesRep.salesRep,
        updatedSalesRep,
        salesRepId
      );
      set((state) => ({
        salesReps: state.salesReps.map((rep) =>
          rep._id === salesRepId ? { ...fetchedSalesRep.salesRep } : rep
        ),
      }));
      return fetchedSalesRep;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useSalesRepStore;

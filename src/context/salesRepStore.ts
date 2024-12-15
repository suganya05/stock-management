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
  ) => Promise<string>;
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
      const res = await getSalesReps(user);
      if (res.type == "sucess") {
        set({ salesReps: res.data?.data });
      }
    }
  },

  createSalesRep: async (user, salesRep) => {
    const newRepRes = await createSalesRep(user, salesRep);
    if (newRepRes.type == "sucess") {
      set((state) => ({
        salesReps: [...state.salesReps, newRepRes.data?.data],
      }));
      return newRepRes.data.additional_data;
    }
  },

  removeSalesRep: async (user, salesRepId) => {
    const removeRes = await deleteSalesRep(user, salesRepId);
    if (removeRes.type == "sucess") {
      set((state) => ({
        salesReps: state.salesReps.filter((rep) => rep._id !== salesRepId),
      }));
    }
  },

  updateSalesRep: async (user, salesRepId, updatedSalesRep) => {
    const fetchedSalesRep = await updateSalesRepBck(
      user,
      salesRepId,
      updatedSalesRep
    );
    if (fetchedSalesRep.type == "sucess") {
      set((state) => ({
        salesReps: state.salesReps.map((rep) =>
          rep._id === salesRepId ? { ...fetchedSalesRep.data.data } : rep
        ),
      }));
      return fetchedSalesRep;
    }
  },
}));

export default useSalesRepStore;

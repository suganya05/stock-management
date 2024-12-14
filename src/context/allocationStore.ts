import { User } from "firebase/auth";
import { create } from "zustand";
import { IAllocate, IStockItem } from "../types/types";
import {
  createAllocation,
  deleteAllocation,
  getAllocation,
  handleUploadCsv,
  PreviousStock,
} from "../helpers/allocate";
import { toast } from "react-toastify";

interface AllocationStore {
  allocations: Partial<IAllocate>[];
  fetchAllocations: (user: User | null) => Promise<void>;
  createAllocations: (
    user: User | null,
    salesPersonId: string,
    allocatedItems: IStockItem[]
  ) => Promise<void>;
  removeAllocations: (
    user: User | null,
    productId: string,
    salesPersonId: string
  ) => void;
  updateAllocation: (user: User | null, allocation: IAllocate) => void;
  uploadCSV: (user: User | null, file: File) => Promise<void>;
  makeExistingStock: (user: User | null) => void;
}

const useAllocationsStore = create<AllocationStore>((set, get) => ({
  allocations: [],

  fetchAllocations: async (user) => {
    try {
      const res = await getAllocation(user);
      set({ allocations: res.data });
    } catch (error: any) {
      toast.error(error.msg);
    }
  },

  createAllocations: async (user, salesPersonId, allocations) => {
    try {
      const res = await createAllocation(user, salesPersonId, allocations);
      get().fetchAllocations(user);
    } catch (error) {
      console.log(error);
    }
  },

  removeAllocations: async (
    user: any,
    productId: string,
    salesPersonId: string
  ) => {
    try {
      const deleteProduct = await deleteAllocation(
        user,
        salesPersonId,
        productId
      );
      console.log("Deleted", deleteProduct.data);

      set((state) => {
        const salesPersonData = state.allocations.find(
          (item) => item.salesPerson?._id === salesPersonId
        );

        if (salesPersonData) {
          salesPersonData.allocatedItems =
            salesPersonData?.allocatedItems?.filter(
              (item) => item.product._id !== productId
            );

          salesPersonData.availableItems =
            salesPersonData?.availableItems?.filter(
              (item) => item.product._id !== productId
            );
        }

        return { allocations: [...state.allocations] };
      });
    } catch (error) {
      console.error("Error in removeAllocations:", error);
    }
  },
  updateAllocation: async (user, allocations) => {
    // try {
    //   const res = await createAllocation(user, allocations);
    //   set({ allocations: res });
    // } catch (error) {
    //   console.log(error);
    // }
  },
  uploadCSV: async (user, file) => {
    try {
      const data = await handleUploadCsv(user, file);
      get().fetchAllocations(user);
    } catch (error) {
      console.log(error);
    }
  },
  makeExistingStock: async (user) => {
    try {
      const res = await PreviousStock(user);
      console.log("got");
      set({ allocations: res });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAllocationsStore;

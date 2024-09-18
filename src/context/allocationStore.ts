import { User } from "firebase/auth";
import { create } from "zustand";
import { IAllocate } from "../types/types";
import {
  createAllocation,
  deleteAllocation,
  getAllocation,
  handleUploadCsv,
  PreviousStock,
} from "../helpers/allocate";

interface AllocationStore {
  allocations: Partial<IAllocate>;
  fetchAllocations: (user: User | null, date: Date) => Promise<void>;
  createAllocations: (
    user: User | null,
    allocations: IAllocate
  ) => Promise<void>;
  removeAllocations: (
    user: User | null,
    repAllocationId: string,
    productId: string,
    salesPersonId: string
  ) => void;
  updateAllocation: (user: User | null, allocation: IAllocate) => void;
  uploadCSV: (user: User | null, file: File, date: Date) => Promise<void>;
  makeExistingStock: (user: User | null) => void;
}

const useAllocationsStore = create<AllocationStore>((set, get) => ({
  allocations: {},

  fetchAllocations: async (user, date) => {
    try {
      const res = await getAllocation(user, date);
      console.log("fecthed allocation", res);
      set({ allocations: res });
    } catch (error) {
      console.log(error);
    }
  },

  createAllocations: async (user, allocations) => {
    try {
      const res = await createAllocation(user, allocations);
      set({ allocations: res });
    } catch (error) {
      console.log("Error occured on fetching allocations", error);
    }
  },

  removeAllocations: async (
    user: any,
    repAllocationId: string,
    productId: string,
    salesPersonId: string
  ) => {
    try {
      const res = await deleteAllocation(user, repAllocationId, productId);

      set((state) => {
        const updatedAllocations = state.allocations.allocations?.map(
          (allocate) => {
            if (allocate.salesPersonId === salesPersonId) {
              if (allocate.allocatedItems) {
                const filteredItems = allocate.allocatedItems.filter(
                  (p) => p.productId._id !== productId
                );

                return {
                  ...allocate,
                  allocatedItems: filteredItems,
                };
              }
            }
            return allocate;
          }
        );

        return {
          ...state,
          allocations: {
            ...state.allocations,
            allocations: updatedAllocations,
          },
        };
      });
    } catch (error) {
      console.log("Error removing allocation:", error);
    }
  },
  updateAllocation: async (user, allocations) => {
    try {
      const res = await createAllocation(user, allocations);
      set({ allocations: res });
    } catch (error) {
      console.log(error);
    }
  },
  uploadCSV: async (user, file, date) => {
    try {
      const data = await handleUploadCsv(user, file, date);
      // console.log(data);
      set({ allocations: data });
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

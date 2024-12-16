import { User } from "firebase/auth";
import { create } from "zustand";

import { IOutlet } from "../types/types";
import {
  createOutlet,
  deleteOutlet,
  getOutlets,
  parseAndUploadOutletCSV,
  updateOutletBck,
} from "../helpers/outlets";

interface OutletStore {
  outlets: Partial<IOutlet>[];
  fetchOutlets: (user: User | null) => Promise<void>;
  createOutlet: (user: User | null, outlet: Partial<IOutlet>) => void;
  removeOutlet: (user: User | null, outletId: string) => Promise<void>;
  updateOutlet: (
    user: User | null,
    outletId: string,
    updatedOutlet: Partial<IOutlet>
  ) => Promise<IOutlet | undefined>;
  uploadCSV: (user: User | null, csvFile: File) => void;
}

const useOutletStore = create<OutletStore>((set, get) => ({
  outlets: [],

  fetchOutlets: async (user) => {
    if (user) {
      try {
        const response = await getOutlets(user);
        set({ outlets: response.data.data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  createOutlet: async (user, outlet) => {
    try {
      const response = await createOutlet(user, outlet);
      //   const data = await getOutlets(user);
      //   set({ outlets: data });
      if (response.type == "sucess") {
        set((state) => ({
          outlets: [...state.outlets, response.data.data],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  removeOutlet: async (user, outletId) => {
    try {
      const res = await deleteOutlet(user, outletId);
      if (res.type == "sucess") {
        set((state) => ({
          outlets: state.outlets.filter((outlet) => outlet._id !== outletId),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateOutlet: async (user, outletId, updatedOutlet) => {
    try {
      const response = await updateOutletBck(user, outletId, updatedOutlet);
      if (response.type == "sucess") {
        set((state) => ({
          outlets: state.outlets.map((outlet) =>
            outlet._id === outletId
              ? { ...outlet, ...response.data.data }
              : outlet
          ),
        }));
        return response.data.data as IOutlet;
      }
    } catch (error) {
      console.log(error);
    }
  },

  uploadCSV: async (user, file) => {
    try {
      const response = await parseAndUploadOutletCSV(user, file);
      console.log("oulet", response);
      console.log("oulet", get().outlets);
      set((state) => ({
        outlets: [...state.outlets, ...response],
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useOutletStore;

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
  removeOutlet: (user: User | null, outletId: string) => void;
  updateOutlet: (
    user: User | null,
    outletId: string,
    updatedOutlet: Partial<IOutlet>
  ) => Promise<IOutlet | undefined>;
  uploadCSV: (user: User | null, csvFile: File) => void;
}

const useOutletStore = create<OutletStore>((set) => ({
  outlets: [],

  fetchOutlets: async (user) => {
    if (user) {
      try {
        const data = await getOutlets(user);
        set({ outlets: data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  createOutlet: async (user, outlet) => {
    try {
      const newOutlet = await createOutlet(user, outlet);
      //   const data = await getOutlets(user);
      //   set({ outlets: data });
      set((state) => ({
        outlets: [...state.outlets, newOutlet.newOutlet],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  removeOutlet: async (user, outletId) => {
    try {
      await deleteOutlet(user, outletId);
      set((state) => ({
        outlets: state.outlets.filter((outlet) => outlet._id !== outletId),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateOutlet: async (user, outletId, updatedOutlet) => {
    try {
      const fetchedOutlet = await updateOutletBck(
        user,
        outletId,
        updatedOutlet
      );
      set((state) => ({
        outlets: state.outlets.map((outlet) =>
          outlet._id === outletId
            ? { ...outlet, ...fetchedOutlet.outlet }
            : outlet
        ),
      }));
      // console.log("returned", fetchedOutlet.outlet);
      return fetchedOutlet.outlet as IOutlet;
    } catch (error) {
      console.log(error);
    }
  },

  uploadCSV: async (user, file) => {
    try {
      const newData = await parseAndUploadOutletCSV(user, file);
      set((state) => ({
        outlets: [...state.outlets, ...newData],
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useOutletStore;

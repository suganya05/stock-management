import { User } from "firebase/auth";
import { create } from "zustand";
import {
  createProduct,
  deleteProduct,
  getProducts,
  parseAndUploadCSV,
  updateProductBck,
} from "../helpers/products";
import { IProduct } from "../types/types";

interface ProductStore {
  products: Partial<IProduct>[];
  fetchProduct: (user: User | null) => Promise<void>;
  addProduct: (user: User | null, product: Partial<IProduct>) => void;
  removeProduct: (user: User | null, productId: string) => void;
  updateProduct: (
    user: User | null,
    productId: string,
    updatedProduct: IProduct
  ) => void;
  uploadCSV: (user: User | null, csvFile: File) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProduct: async (user) => {
    if (user) {
      try {
        const data = await getProducts(user);
        set({ products: data });
      } catch (error) {
        console.log(error);
      }
    }
  },

  addProduct: async (user, product) => {
    try {
      await createProduct(user, product);
      const data = await getProducts(user);
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },

  removeProduct: async (user, productId) => {
    try {
      await deleteProduct(user, productId);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (user, productId, updatedProduct) => {
    try {
      await updateProductBck(user, productId, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, ...updatedProduct }
            : product
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  uploadCSV: async (user, file) => {
    try {
      await parseAndUploadCSV(user, file);
      const data = await getProducts(user);
      set({ products: data });
      console.log("new data", data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useProductStore;

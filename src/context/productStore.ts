import { User } from "firebase/auth";
import { create } from "zustand";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProductBck,
} from "../helpers/products";
import { IProduct } from "../types/types";

interface ProductStore {
  products: IProduct[];
  fetchProduct: (user: User | null) => Promise<void>;
  addProduct: (user: User | null, product: IProduct) => void;
  removeProduct: (user: User | null, productId: string) => void;
  updateProduct: (
    user: User | null,
    productId: string,
    updatedProduct: IProduct
  ) => void;
  //   setProducts: (user: User | null, newProducts: IProduct[]) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProduct: async (user) => {
    try {
      const data = await getProducts(user);
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },

  addProduct: async (user, product) => {
    try {
      await createProduct(user, product);
      set((state) => ({ products: [...state.products, product] }));
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
  //   setProducts: (user, newProducts) => set(() => ({ products: newProducts })),
}));

export default useProductStore;

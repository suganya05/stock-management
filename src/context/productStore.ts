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
  addProduct: (user: User | null, product: Partial<IProduct>) => Promise<void>;
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
      const res = await getProducts(user);
      if (res?.type == "sucess") {
        set({ products: res.data.data });
      }
    }
  },

  addProduct: async (user, product) => {
    const createRes = await createProduct(user, product);
    if (createRes.type == "sucess") {
      const res = await getProducts(user);
      if (res) {
        set({ products: res.data.data });
      }
    }
  },

  removeProduct: async (user, productId) => {
    const delRes = await deleteProduct(user, productId);
    if (delRes.type == "sucess") {
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
    }
  },
  updateProduct: async (user, productId, updatedProduct) => {
    const updateRes = await updateProductBck(user, productId, updatedProduct);
    if (updateRes.type == "sucess") {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, ...updatedProduct }
            : product
        ),
      }));
    }
  },
  uploadCSV: async (user, file) => {
    // const parsingRes = await parseAndUploadCSV(user, file);
    // if (parsingRes.type === "sucess") {
    //   const data = await getProducts(user);
    //   if (data?.type == "sucess") {
    //     set({ products: data.data.data });
    //   }
    // }
  },
}));

export default useProductStore;

import { Auth, User } from "firebase/auth";
import { backend_url } from "../constants/backend";
import axios from "axios";
import { AddNewProductForm, IProduct } from "../types/types";

export const getProducts = async (user: User | null) => {
  if (!user) {
    return;
  }
  const url = `${backend_url}admin/products/all`;
  const idToken = await user.getIdToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };
  const response = await axios.get(url, { headers });
  return response.data;
};

export const createProduct = async (user: User | null, values: IProduct) => {
  try {
    const url = `${backend_url}admin/products`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    // const ProductData = {
    //   name: values.name,
    //   unit: values.unitOfMesurment,
    //   actualPrice: parseInt(values.wholesalePrice),
    //   retailPrice: parseInt(values.retailPrice),
    //   imgUrl: values.imgUrl,
    // };
    const res = await axios.post(url, values, { headers });
    if (res.status !== 201) {
      throw Error("Unexpected status code");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (user: User | null, productId: string) => {
  try {
    const url = `${backend_url}admin/products/${productId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const response = await axios.delete(url, { headers });
    if (response.status !== 200) {
      throw Error("Unexpected status code");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProductBck = async (
  user: User | null,
  productId: string,
  updatedProductData: IProduct
) => {
  try {
    const url = `${backend_url}admin/products/${productId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    };

    console.log("updated data", updatedProductData);

    const response = await axios.put(url, updatedProductData, { headers });

    if (response.status !== 200) {
      throw Error("Unexpected status code");
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

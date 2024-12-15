import { Auth, User } from "firebase/auth";
import { AddNewProductForm, IProduct } from "../types/types";
import Papa from "papaparse";
import { auth } from "../utils/handleCalls";

export const getProducts = async (user: User | null) => {
  if (!user) {
    return;
  }
  const url = `admin/products/all`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

export const createProduct = async (
  user: User | null,
  values: Partial<IProduct>
) => {
  const url = `admin/products`;
  const ProductData = {
    name: values.name,
    unit: values.unit,
    actualPrice: parseInt(values.actualPrice?.toString() || "0"),
    retailPrice: parseInt(values.retailPrice?.toString() || "0"),
    photoUrl: values.photoUrl,
  };
  const res = await auth({ method: "POST", url, user, data: ProductData });
  return res;
};

export const deleteProduct = async (user: User | null, productId: string) => {
  const url = `admin/products/${productId}`;
  const res = await auth({ method: "DELETE", url, user });
  return res;
};

export const updateProductBck = async (
  user: User | null,
  productId: string,
  updatedProductData: IProduct
) => {
  const url = `admin/products/${productId}`;

  const res = await auth({
    url,
    user,
    method: "PUT",
    data: updatedProductData,
  });
  return res;
};

const convertCsvToJson = (data: any[]) => {
  return data.map((row: any) => {
    return {
      name: row["Product Name"] as string,
      actualPrice: row["Wholesale Price"] as number,
      retailPrice: row["Retail Price"] as number,
      unit: row["Unit"] as string,
    };
  });
};

//rephrase this function
export const parseAndUploadCSV = async (user: User | null, file: File) => {
  return new Promise<void>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        const jsonData = convertCsvToJson(result.data);
        try {
          await Promise.all(
            jsonData.map(async (product) => {
              await createProduct(user, product);
            })
          );
          resolve();
        } catch (error) {
          console.error("Failed to upload product:", error);
          reject(error);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

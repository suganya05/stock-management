import { User } from "firebase/auth";
import { backend_url } from "../constants/backend";
import Papa from "papaparse";
import { auth } from "../utils/handleCalls";
import { ParseFile } from "../utils/handleFile";
import { IStatus } from "../types/types";

export const getProducts = async (user: User | null) => {
  if (!user) {
    return;
  }
  const url = `admin/products/all`;
  const response = await auth({ method: "GET", url, user });
  return response;
};

export const createProduct = async (user: User | null, values: any) => {
  const url = `admin/products`;

  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("unit", values.unit);
  formData.append("actualPrice", values.actualPrice);
  formData.append("retailPrice", values.retailPrice);

  if (values.photoFile) {
    formData.append("photoFile", values.photoFile);
  }

  //   const res = await axios.post(url, formData, { headers });
  const res = await auth({ method: "POST", url, user, data: formData });

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
  updatedProductData: any
  //   imageFile: any
) => {
  const url = `${backend_url}/admin/products/${productId}`;
  const formData = new FormData();

  formData.append("name", updatedProductData.name);
  formData.append("unit", updatedProductData.unit);
  formData.append("actualPrice", updatedProductData.actualPrice.toString());
  formData.append("retailPrice", updatedProductData.retailPrice.toString());

  //   if (imageFile) {
  //     formData.append("photoFile", imageFile);
  //   }

  return auth({ method: "PUT", url, user, data: formData });
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

export const parseAndUpload = async (user: User | null, file: File) => {
  try {
    const raw_data = await ParseFile(file);
    const data = convertCsvToJson(raw_data);
    await Promise.all(
      data.map(async (product) => {
        await createProduct(user, product);
      })
    );
    return { type: "sucess", data: "success" } as IStatus;
  } catch (error) {
    return { type: "server", data: "faild" } as IStatus;
  }
};

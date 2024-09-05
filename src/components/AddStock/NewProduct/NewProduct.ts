import { User } from "firebase/auth";
import { backend_url } from "../../../constants/backend";
import axios from "axios";
import { setUncaughtExceptionCaptureCallback } from "process";
import { AddNewProductForm } from "../../../types/types";
import Papa from "papaparse";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";

export const getProduct = async (
  user: User | null,
  page: number,
  limit: number
) => {
  // get product and return
  try {
    const url = `${backend_url}admin/products/${page}/${limit}`;
    const idToken = await user?.getIdToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProduct = async (
  user: User | null,
  values: AddNewProductForm
) => {
  try {
    const url = `${backend_url}admin/products`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const ProductData = {
      name: values.name,
      unit: values.unitOfMesurment,
      actualPrice: parseInt(values.wholesalePrice),
      retailPrice: parseInt(values.retailPrice),
      imgUrl: values.imgUrl,
    };
    const res = await axios.post(url, ProductData, { headers });
    if (res.status !== 201) {
      throw Error("Unexpected status code");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (user: User | null, id: string) => {
  try {
    const url = `${backend_url}admin/products/${id}`;
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

export const editProduct = async (
  user: User | null,
  id: string,
  updatedProductData: AddNewProductForm
) => {
  try {
    const url = `${backend_url}admin/products/${id}`;
    const idToken = await user?.getIdToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    };

    console.log("updated data", updatedProductData);
    const ProductData = {
      prodName: updatedProductData.name,
      prodUnit: updatedProductData.unitOfMesurment,
      actualPrice: parseInt(updatedProductData.wholesalePrice),
      retailPrice: parseInt(updatedProductData.retailPrice),
      prodProfile: updatedProductData.imgUrl,
    };

    const response = await axios.put(url, ProductData, { headers });

    if (response.status !== 200) {
      throw Error("Unexpected status code");
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const convertCsvToJson = (data: any[]) => {
  return data.map((row: any) => {
    return {
      name: row["Product Name"] as string,
      wholesalePrice: row["Wholesale Price"] as string,
      retailPrice: row["Retail Price"] as string,
      unitOfMesurment: row["Unit"] as string,
    };
  });
};

export const parseAndUploadCSV = async (user: User | null, file: File) => {
  return new Promise<void>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        console.log("Parsed CSV data:", result.data);

        const jsonData = convertCsvToJson(result.data);
        console.log("JSON data:", jsonData);

        // Iterate through each product and upload them
        for (const product of jsonData) {
          try {
            await createProduct(user, product);
            console.log("Product uploaded successfully:", product);
          } catch (error) {
            console.error("Failed to upload product:", product, error);
            reject(error); // Reject promise if any product upload fails
            return;
          }
        }

        resolve(); // Resolve promise after all uploads are completed
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

const uploadImag = async (img: File) => {
  try {
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadImageToFirebase = (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

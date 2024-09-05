import { TwitterAuthProvider, User } from "firebase/auth";
import { backend_url } from "../../../constants/backend";
import axios from "axios";
import { IOutlet } from "../../../types/types";
import Papa from "papaparse";

export const getAllOulets = async (
  user: User | null,
  page: number,
  limit: number
) => {
  try {
    const url = `${backend_url}admin/outlets/${page}/${limit}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.get(url, { headers });
    if (res.status != 200) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createOutlet = async (user: User | null, outletData: IOutlet) => {
  try {
    const url = `${backend_url}admin/outlets`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, outletData, { headers });
    if (res.status != 201) {
      throw Error(
        `Error occured while creating outlet with error code ${res.status}`
      );
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateOutlet = async (
  user: User | null,
  outletId: string,
  updatedData: IOutlet
) => {
  try {
    const url = `${backend_url}admin/outlets/${outletId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.put(url, updatedData, { headers });

    if (res.status != 200) {
      throw Error(`Error occured with error code ${res.status}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteOutlet = async (user: User | null, outletId: string) => {
  try {
    const url = `${backend_url}admin/outlets/${outletId}`;
    const idTkoken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idTkoken}`,
    };
    const res = await axios.delete(url, { headers });
    if (res.status != 200) {
      throw Error(`Error occured with error code ${res.status}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseAndUploadCSV = async (user: User | null, file: File) => {
  return new Promise<void>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        console.log("Parsed CSV data:", result.data);

        const jsonData = convertCsvToJson(result.data);
        console.log("JSON data:", jsonData);

        for (const outlet of jsonData) {
          try {
            await createOutlet(user, outlet);
            console.log("Product uploaded successfully:", outlet);
          } catch (error) {
            console.error("Failed to upload product:", outlet, error);
            reject(error);
            return;
          }
        }

        resolve();
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

export const convertCsvToJson = (data: any[]) => {
  return data.map((row: any) => {
    return {
      outletName: row["Outlet Name"] as string,
      ownerName: row["Owner Name"] as string,
      email: row["Email"] as string,
      phoneNumber: row["Phone number"] as string,
      address: row["Address"] as string,
    } as IOutlet;
  });
};

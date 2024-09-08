import { User } from "firebase/auth";
import { IOutlet } from "../types/types";
import { backend_url } from "../constants/backend";
import axios from "axios";
import Papa from "papaparse";

export const getOutlets = async (user: User | null) => {
  try {
    const url = `${backend_url}admin/outlets`;
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

export const createOutlet = async (
  user: User | null,
  outlet: Partial<IOutlet>
) => {
  try {
    const url = `${backend_url}admin/outlets`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, outlet, { headers });
    if (res.status != 201) {
      throw Error(
        `Error occured while creating outlet with error code ${res.status}`
      );
    }
    return res.data;
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

export const updateOutletBck = async (
  user: User | null,
  outletId: string,
  updatedOutlet: Partial<IOutlet>
) => {
  try {
    const url = `${backend_url}admin/outlets/${outletId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.put(url, updatedOutlet, { headers });

    if (res.status != 200) {
      throw Error(`Error occured with error code ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseAndUploadOutletCSV = async (
  user: User | null,
  file: File
): Promise<Partial<IOutlet>[]> => {
  return new Promise<IOutlet[]>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        const jsonData = convertCsvToJson(result.data);

        try {
          const createdOutlets = await Promise.all(
            jsonData.map(async (product) => {
              const newOutlet = await createOutlet(user, product); // this returns newly created data
              return newOutlet.newOutlet; // Collect the newly created outlet
            })
          );

          resolve(createdOutlets); // Resolve with the array of newly created outlets
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

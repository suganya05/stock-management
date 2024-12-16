import { User } from "firebase/auth";
import { IOutlet } from "../types/types";
import Papa from "papaparse";
import { auth } from "../utils/handleCalls";
import { toast } from "react-toastify";

export const getOutlets = async (user: User | null) => {
  const url = `admin/outlets`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

export const createOutlet = async (
  user: User | null,
  outlet: Partial<IOutlet>
) => {
  const url = `admin/outlets`;
  const res = await auth({ method: "POST", url, user, data: outlet });
  return res;
};

export const deleteOutlet = async (user: User | null, outletId: string) => {
  const url = `admin/outlets/${outletId}`;
  const res = await auth({ method: "DELETE", url, user });
  return res;
};

export const updateOutletBck = async (
  user: User | null,
  outletId: string,
  updatedOutlet: Partial<IOutlet>
) => {
  const url = `admin/outlets/${outletId}`;
  const res = await auth({ method: "PUT", url, user, data: updatedOutlet });
  return res;
};

export const parseAndUploadOutletCSV = async (
  user: User | null,
  file: File
) => {
  return new Promise<IOutlet[]>((resolve, reject) => {
    Papa.parse(file, {
      complete: async (result) => {
        const jsonData = convertCsvToJson(result.data);

        try {
          const createdOutlets = await Promise.all(
            jsonData.map(async (product) => {
              const newOutlet = await createOutlet(user, product);
              return newOutlet.data.data;
            })
          );

          resolve(createdOutlets);
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

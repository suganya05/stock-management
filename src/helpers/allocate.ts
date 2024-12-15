import { User } from "firebase/auth";
import { IStatus, IStockItem } from "../types/types";
import { ParseFile } from "../utils/handleFile";
import { auth } from "../utils/handleCalls";

export const createAllocations = async (
  user: User | null,
  salesPersonId: string,
  allocatedItems: IStockItem[]
): Promise<IStatus> => {
  const url = `admin/allocations`;
  const data = {
    salesPersonId: salesPersonId,
    items: allocatedItems,
  };
  const res = await auth({ user, method: "POST", url, data: data });
  return res;
};

export const getAllocation = async (user: User | null): Promise<IStatus> => {
  const url = "admin/allocations";
  const res = await auth({ user: user, method: "GET", url: url });
  return res;
};

export const deleteAllocation = async (
  user: User | null,
  salesPersonId: string,
  productId: string
) => {
  const url = `admin/allocations/${salesPersonId}/${productId}`;

  const res = auth({ method: "DELETE", url, user });
  return res;
};

//segregate file handling
export const handleUploadCsv = async (user: User | null, file: File) => {
  const fileData = await ParseFile(file);
  const data = fileData.data.map((row: any) => {
    return {
      salesPersonId: row["Sales Person Id"],
      productId: row["Product Id"],
      quantity: row["Quantity"],
    };
  });
  const url = `admin/allocations/bulk`;
  const res = await auth({ method: "POST", url, user, data });
  return res;
};

export const PreviousStock = async (user: User | null) => {
  const url = `admin/allocations/use-existing`;
  const res = await auth({ method: "POST", url, user });
  return res.data;
};

import { User } from "firebase/auth";
import { ISalesPerson } from "../types/types";
import { auth } from "../utils/handleCalls";

const url = `admin/sales-persons`;

export const createSalesRep = async (
  user: User | null,
  salesRep: Partial<ISalesPerson>,
  photoFile: File | undefined
) => {
  const formData = new FormData();

  (Object.keys(salesRep) as (keyof ISalesPerson)[]).forEach((key) => {
    const value = salesRep[key];
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  if (photoFile) {
    formData.append("photoFile", photoFile);
  }

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const res = await auth({
    method: "POST",
    url,
    user,
    data: salesRep,
    options: { headers },
  });
  return res;
};

export const getSalesReps = async (user: User | null) => {
  const urlWithQuery = `${url}/all`;
  const res = await auth({ method: "GET", url: urlWithQuery, user });
  return res;
};

export const deleteSalesRep = async (user: User | null, salesRepId: string) => {
  const urlWthParam = `${url}/${salesRepId}`;
  const res = await auth({ method: "DELETE", url: urlWthParam, user });
  return res;
};

export const updateSalesRepBck = async (
  user: User | null,
  id: string,
  updatedRepData: Partial<ISalesPerson>
) => {
  const urlWithParam = `${url}/${id}`;
  const res = await auth({
    url: urlWithParam,
    method: "PUT",
    data: updatedRepData,
    user,
  });
  return res;
};

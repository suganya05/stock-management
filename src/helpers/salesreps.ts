import { User } from "firebase/auth";
import { ISalesPerson } from "../types/types";
import { backend_url } from "../constants/backend";
import axios from "axios";

const url = `${backend_url}admin/sales-persons`;

export const createSalesRep = async (
  user: User | null,
  salesRep: Partial<ISalesPerson>
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, salesRep, { headers });
    if (res.status !== 201) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesReps = async (user: User | null) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWithQuery = `${url}/all`;
    const res = await axios.get(urlWithQuery, { headers });
    if (res.status != 200) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteSalesRep = async (user: User | null, salesRepId: string) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWthParam = `${url}/${salesRepId}`;

    const res = await axios.delete(urlWthParam, { headers });
    if (res.status !== 200) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSalesRepBck = async (
  user: User | null,
  id: string,
  updatedRepData: Partial<ISalesPerson>
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWithParam = `${url}/${id}`;
    const res = await axios.put(urlWithParam, updatedRepData, { headers });
    if (res.status != 200) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

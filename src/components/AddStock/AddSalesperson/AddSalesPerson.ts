import { User } from "firebase/auth";
import { ISalesPerson } from "../../../types/types";
import { backend_url } from "../../../constants/backend";
import axios from "axios";

const url = `${backend_url}admin/sales-persons`;

export const createSalesPersons = async (
  user: User | null,
  data: ISalesPerson
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, data, { headers });
    if (res.status !== 201) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesPersons = async (
  user: User | null,
  page: number,
  limit: number
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWithQuery = `${url}/?page=${page}&limit=${limit}`;
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

export const deleteSalesPerson = async (user: User | null, id: string) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWthParam = `${url}/${id}`;

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

export const updateSalesPerson = async (
  user: User | null,
  id: string,
  updatedRepData: ISalesPerson
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
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleSalesPerson = async (
  user: User | null,
  id: string,
  state: boolean
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const urlWithParam = `${url}/toggleActive/${id}`;
    const data = {
      active: state,
    };
    const res = await axios.put(urlWithParam, data, { headers });
    if (res.status !== 200 && res.status !== 304) {
      throw Error(`Error occured with status code ${res.status}`);
    }
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

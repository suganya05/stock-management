import axios from "axios";
import { backend_url } from "../../../constants/backend";
import { User } from "firebase/auth";
import { IStatus } from "../../../types/types";

export const getMonetoryStat = async (user: User | null) => {
  try {
    const url = `${backend_url}/admin/sales/monitory-stat`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const response = await axios.get(url, { headers });
    return { type: "sucess", data: response.data } as IStatus;
  } catch (error: any) {
    console.log(error);
    return { type: "unknown", data: error.response } as IStatus;
  }
};

export const getMonetoryStatForSevenDays = async (user: User | null) => {
  try {
    const url = `${backend_url}/admin/sales/monitory-stat/7`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const response = await axios.get(url, { headers });
    return { type: "sucess", data: response.data } as IStatus;
  } catch (error: any) {
    console.log(error);
    return { type: "unknown", data: error.response } as IStatus;
  }
};

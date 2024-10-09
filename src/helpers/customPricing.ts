import axios from "axios";
import { backend_url } from "../constants/backend";
import { User } from "firebase/auth";

export const getCustomPricingProduct = async (
  user: User | null,
  outletId: string
) => {
  try {
    const url = `${backend_url}admin/custom-pricing/${outletId}`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

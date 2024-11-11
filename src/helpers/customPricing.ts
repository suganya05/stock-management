import axios from "axios";
import { backend_url } from "../constants/backend";
import { User } from "firebase/auth";

export const getCustomPricingProduct = async (
  user: User | null,
  outletId: string
) => {
  try {
    const url = `${backend_url}/admin/custom-pricing/${outletId}`;
    console.log(url);
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

export const addCustomPricing = async (
  user: User | null,
  outletId: string,
  productId: string,
  price: number
) => {
  try {
    const url = `${backend_url}/admin/custom-pricing/add`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const data = {
      outletId: outletId,
      productId: productId,
      retailPrice: price,
    };
    console.log("custom pricng data", data);
    const res = await axios.post(url, data, { headers });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

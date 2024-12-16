import { User } from "firebase/auth";
import { auth } from "../utils/handleCalls";

export const getCustomPricingProduct = async (
  user: User | null,
  outletId: string
) => {
  const url = `admin/custom-pricing/${outletId}`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

export const addCustomPricing = async (
  user: User | null,
  outletId: string,
  productId: string,
  price: number
) => {
  const url = `admin/custom-pricing/add`;
  const data = {
    outletId: outletId,
    productId: productId,
    retailPrice: price,
  };
  const res = await auth({ method: "POST", url, user, data });
  return res;
};

export const deleteCP = async (user: User | null, id: string | undefined) => {
  const url = `admin/custom-pricing/${id}`;
  const res = await auth({ method: "DELETE", url, user });
  return res;
};

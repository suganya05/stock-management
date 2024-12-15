import { User } from "firebase/auth";
import { auth } from "../utils/handleCalls";

export const getSales = async (user: User | null) => {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const url = `${backend_url}/admin/sales`;
  //     const idToken = await user?.getIdToken();
  //     const headers = {
  //       Authorization: `Bearer ${idToken}`,
  //     };
  //     const res = await axios.get(url, { headers });
  //     resolve({ type: "sucess", data: res.data } as IStatus);
  //   } catch (error) {
  //     reject(handleError(error, reject));
  //   }
  // });
  const url = `admin/sales`;
  const res = await auth({ user, method: "GET", url });
  return res;
};

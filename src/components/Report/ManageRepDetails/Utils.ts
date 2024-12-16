import axios from "axios";
import { ISales, IStatus } from "../../../types/types";
import { backend_url } from "../../../constants/backend";
import { User } from "firebase/auth";
import { auth } from "../../../utils/handleCalls";

// export const getManageRepForRange = (
//   user: User | null,
//   startDate: Date,
//   endDate: Date
// ): Promise<IStatus> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const startYear = startDate.getFullYear();
//       const startMonth = startDate.getMonth();
//       const startDay = startDate.getDate();

//       const endYear = endDate.getFullYear();
//       const endMonth = endDate.getMonth();
//       const endDay = endDate.getDate();

//       const idToken = await user?.getIdToken();
//       const headers = {
//         Authorization: `Bearer ${idToken}`,
//       };
//       const url = `${backend_url}/admin/manage/sales-rep/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDate}/${endYear}/${endDay}`;
//       const res = await axios.get(url, { headers });
//       resolve({
//         type: "sucess",
//         data: res.data,
//       } as IStatus);
//     } catch (error: any) {
//       if (error.response) {
//         reject({
//           type: "server",
//           data: error.response.data.message,
//         } as IStatus);
//       } else if (error.request) {
//         reject({
//           type: "client",
//           data: "Network error: No response from the server",
//         } as IStatus);
//       } else {
//         reject({
//           type: "unknown",
//           data: error.message,
//         } as IStatus);
//       }
//     }
//   });
// };

export const getManageRepForRange = async (
  user: User | null,
  startDate: Date,
  endDate: Date
) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();
  const url = `${backend_url}/admin/manage/sales-rep/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDate}/${endYear}/${endDay}`;
  const res = await auth({ method: "GET", url, user });
  return res;
};

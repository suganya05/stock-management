import { User } from "firebase/auth";
import { IAllocate } from "../types/types";
import { backend_url } from "../constants/backend";
import axios from "axios";
import Papa from "papaparse";

export const createAllocation = async (
  user: User | null,
  allocations: IAllocate
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const url = `${backend_url}admin/allocations`;
    console.log("creating allocation", allocations);
    const res = await axios.post(url, allocations, { headers });

    if (res.status === 404) {
      throw Error(res.data);
    } else if (res.status === 400) {
      throw Error(res.data);
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllocation = async (user: User | null, date: Date) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const url = `${backend_url}admin/allocations?date=${year}-${month}-${day}`;

    const res = await axios.get(url, { headers });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllocation = async (
  user: User | null,
  repAllocationId: string,
  productId: string
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const url = `${backend_url}admin/allocations/${repAllocationId}/${productId}`;

    const res = await axios.delete(url, { headers });
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const handleUploadCsvSample = async (user: User | null, file: File) => {
  const idToken = await user?.getIdToken();
  const headers = {
    Authorization: `Bearer ${idToken}`,
  };
  const url = `${backend_url}admin/allocations`;

  //structure of csv file
  //Sales Person Id, Product Id, Quantity
  // There will multiple time a same sales person id may appear for different product id
  // if same product id found we should add the old quantity to new qunatity
  // structure the data to
  // {
  //   allotedDate: new Date(),
  //   allocations: [
  //     {
  //       salesPersonId: selectedRepId,
  //       allocatedItems: [{productId, quntity}],
  //     },
  //     {
  //       salesPersonId: selectedRepId,
  //       allocatedItems: [{productId, quntity}],
  //     },
  //   ],
  // }
};

// export const handleUploadCsv = async (user: User | null, file: File) => {
//   try {
//     const idToken = await user?.getIdToken();
//     const headers = {
//       Authorization: `Bearer ${idToken}`,
//     };
//     const url = `${backend_url}admin/allocations`;

//     // Parse the CSV file
//     const parseCsv = (file: File): Promise<any[]> => {
//       return new Promise((resolve, reject) => {
//         Papa.parse(file, {
//           header: true, // Assumes the CSV file has headers
//           complete: (results) => resolve(results.data),
//           error: (error) => reject(error),
//         });
//       });
//     };

//     const csvData = await parseCsv(file);

//     // Structure the allocations data
//     const allocationMap: {
//       [key: string]: {
//         salesPersonId: string;
//         allocatedItems: { productId: string; quantity: number }[];
//       };
//     } = {};

//     csvData.forEach((row) => {
//       const { salesPersonId, productId, quantity } = row;

//       if (!allocationMap[salesPersonId]) {
//         allocationMap[salesPersonId] = {
//           salesPersonId: salesPersonId,
//           allocatedItems: [],
//         };
//       }

//       // Check if the productId already exists in allocatedItems
//       const existingProduct = allocationMap[salesPersonId].allocatedItems.find(
//         (item) => item.productId === productId
//       );

//       if (existingProduct) {
//         // If the product exists, update the quantity
//         existingProduct.quantity += parseInt(quantity, 10);
//       } else {
//         // If not, add the new product with its quantity
//         allocationMap[salesPersonId].allocatedItems.push({
//           productId: productId,
//           quantity: parseInt(quantity, 10),
//         });
//       }
//     });

//     // Structure the final payload
//     const payload = {
//       allotedDate: new Date(),
//       allocations: Object.values(allocationMap), // Converting the allocationMap to an array
//     };

//     // Send the structured data to the backend
//     console.log("data to upload", payload);
//     const response = await axios.post(url, payload, { headers });
//     console.log("csv upload data", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading CSV:", error);
//     throw new Error("Failed to upload CSV");
//   }
// };

const parseCsv = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true, // Assumes the CSV file has headers
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

// Function to map the CSV data into the required structure, handling the exact column names with spaces
const mapCsvToAllocations = (
  csvData: any[]
): {
  [key: string]: {
    salesPersonId: string;
    allocatedItems: { productId: string; quantity: number }[];
  };
} => {
  const allocationMap: {
    [key: string]: {
      salesPersonId: string;
      allocatedItems: { productId: string; quantity: number }[];
    };
  } = {};

  csvData.forEach((row) => {
    const salesPersonId = row["Sales Person Id"];
    const productId = row["Product Id"];
    const quantity = row["Quantity"];

    // Skip the row if any of these fields are empty
    if (!salesPersonId || !productId || !quantity) {
      return;
    }

    if (!allocationMap[salesPersonId]) {
      allocationMap[salesPersonId] = {
        salesPersonId: salesPersonId,
        allocatedItems: [],
      };
    }

    // Check if the productId already exists in allocatedItems
    const existingProduct = allocationMap[salesPersonId].allocatedItems.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      // If the product exists, update the quantity
      existingProduct.quantity += parseInt(quantity, 10);
    } else {
      // If not, add the new product with its quantity
      allocationMap[salesPersonId].allocatedItems.push({
        productId: productId,
        quantity: parseInt(quantity, 10),
      });
    }
  });

  return allocationMap;
};

// Main function to handle CSV upload
export const handleUploadCsv = async (
  user: User | null,
  file: File,
  date: Date
) => {
  try {
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const url = `${backend_url}admin/allocations`;

    // Parse the CSV file
    const csvData = await parseCsv(file);

    // Map the CSV data to the required structure
    const allocationMap = mapCsvToAllocations(csvData);

    // Structure the final payload
    const payload = {
      allotedDate: date,
      allocations: Object.values(allocationMap), // Converting the allocationMap to an array
    };

    // Send the structured data to the backend
    const response = await axios.post(url, payload, { headers });

    return response.data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw new Error("Failed to upload CSV");
  }
};

export const PreviousStock = async (user: User | null) => {
  try {
    const url = `${backend_url}admin/allocations/use-existing`;
    const idToken = await user?.getIdToken();
    const headers = {
      Authorization: `Bearer ${idToken}`,
    };
    const res = await axios.post(url, undefined, { headers });
    console.log("exisitngf", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

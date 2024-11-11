import Papa from "papaparse";

export const ParseFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (result) => resolve(result as any),
      header: true,
      skipEmptyLines: true,
      error: (error) => reject(error),
    });
  });
};

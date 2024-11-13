const units = {
  lt: "Litre",
  ml: "Milli Litre",
  kgs: "Kilo",
  gms: "Gram",
  nos: "No(s)",
  dozens: "Dozens",
};

export const getUnit = (unit: any) => {
  //@ts-ignore
  return units[unit] ? units[unit] : "Unit";
};

// types for everything that has to do with exporting the data
export type fetchedDataset = {
  headers: string[];
  // rows should be arrays of objects with key value pairs 
  rows: Array<{ [key: string]: string }>;
};

export type exportListItem = {
  id: string;
  data: fetchedDataset;
  export_fields: string[];
  format: "json" | "csv" | undefined;
};

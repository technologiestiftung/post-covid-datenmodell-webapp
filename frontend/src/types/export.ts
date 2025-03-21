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

export const bundeslandMapper: Record<string, string> = {
  "01": "Schleswig-Holstein",
  "02": "Hamburg",
  "03": "Niedersachsen",
  "04": "Bremen",
  "05": "Nordrhein-Westfalen",
  "06": "Hessen",
  "07": "Rheinland-Pfalz",
  "08": "Baden-Württemberg",
  "09": "Bayern",
  "10": "Saarland",
  "11": "Berlin",
  "12": "Brandenburg",
  "13": "Mecklenburg-Vorpommern",
  "14": "Sachsen",
  "15": "Sachsen-Anhalt",
  "16": "Thüringen",
};

// reverse mapper of bundesland mapper -> key value pairs are reversed
export const reverseBundeslandMapper: Record<string, string> =
  Object.fromEntries(
    Object.entries(bundeslandMapper).map(([key, value]) => [value, key])
  );

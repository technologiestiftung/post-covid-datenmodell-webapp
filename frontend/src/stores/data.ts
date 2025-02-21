// Utilities
import { defineStore } from "pinia";
import dataEntries from "../data/2025-02-18_metadata.json";
import { type MetaDataEntry } from "../types/metadata";

export const useDataStore = defineStore("data", () => {
  const metaData = dataEntries as MetaDataEntry[];

  return { metaData };
});

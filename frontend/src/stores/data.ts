// Utilities
import { defineStore } from "pinia";
import dataEntries from "../data/2025-02-18_metadata.json";
import { type MetaDataEntry } from "../types/metadata";
import { type KreisData } from "../types/utils";
import { ref } from "vue";
import { bundeslandMapper } from "../utils/geoTransformation";

// parse data for landkreise and plz

async function loadKreisData(): Promise<KreisData[]> {
  const response = await fetch("/2024-12-03_postleitzahlen_kreis_id.csv");

  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.status}`);
  }

  const csv = await response.text();

  const lines = csv.trim().split("\n");

  // Remove header and get remaining data rows
  const [_header, ...rows] = lines;

  return rows.map((row) => {
    const parts = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const kreisName = parts[0].trim();
    const postleitzahl = parts[1].trim();
    const kreisCode = parts[2].trim();

    // The 4th part is the quoted lat,lng string
    const geoPointStr = parts[3].replace(/"/g, "");

    const [latStr, lngStr] = geoPointStr.split(",").map((val) => val.trim());

    // if kreisCode is 4 digits use the first digit as bundesland code and add 0 to the start; else use the first 2 digits
    const bundeslandCode =
      kreisCode.length === 4 ? `0${kreisCode[0]}` : kreisCode.slice(0, 2);

    return {
      name: kreisName.trim(),
      zipCode: postleitzahl.trim(),
      districtCode: kreisCode.trim(),
      bundesland: bundeslandMapper[bundeslandCode],
      bundeslandCode: bundeslandCode,
      geoPoint: {
        lat: parseFloat(latStr),
        lng: parseFloat(lngStr),
      },
    };
  });
}

export const useDataStore = defineStore("data", () => {
  const metaData = dataEntries as MetaDataEntry[];
  const kreisData = ref<KreisData[]>([]);

  loadKreisData()
    .then((data) => {
      kreisData.value = data;
    })
    .catch((error) => {
      console.error("Failed to load kreis data:", error);
    });

  return { metaData, kreisData };
});

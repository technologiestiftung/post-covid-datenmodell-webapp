// util functions used for geo-transformation
import { getDistance, getCenter, findNearest } from "geolib";
import { useDataStore } from "@/stores/data";
import rehabilitationData from "../data/2024-12-02_post_covid_reha.json";
import type { GeolibInputCoordinates } from "geolib/es/types";

export const findNearestStation = (
  patientLat: number,
  patientLong: number,
  dataset: any[],
  latColumn: string,
  longColumn: string
) => {
  // Convert dataset to geolib points format
  const points = dataset.map((station, index) => ({
    latitude: station[latColumn],
    longitude: station[longColumn],
    originalIndex: index, // Keep track of original index
  }));

  // Find nearest point
  const nearest = findNearest(
    { latitude: patientLat, longitude: patientLong },
    points
  ) as GeolibInputCoordinates & { originalIndex: number };
  if (!nearest) {
    throw new Error("No nearest station found");
  }

  // Return the original dataset row
  return dataset[nearest.originalIndex];
};

// todo: typing Reha entry for return

// find nearest state for district
export const findNearestRehaLocation = (
  location: string,
  locationType: string
) => {
  const dataStore = useDataStore();
  // Find matching locations from locations.json
  const matchingLocations = dataStore.kreisData.filter(
    (loc) =>
      locationType === "state"
        ? loc.bundesland === location
        : loc.name === location // district
  );

  if (matchingLocations.length === 0) {
    console.warn(`No matching location found for ${location}`);
    return undefined;
  }

  let nearestFacility;
  let shortestDistance = Infinity;

  matchingLocations.forEach((loc) => {
    rehabilitationData.data.forEach((facility) => {
      const distance = getDistance(
        { latitude: loc.geoPoint.lat, longitude: loc.geoPoint.lng },
        { latitude: facility.latitude, longitude: facility.longitude }
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestFacility = facility;
      }
    });
  });
  return nearestFacility;
};

// function to get the center of a list of locations
export const calculateCenterLongLat = (
  locations: { latitude: number; longitude: number }[]
) => {
  const center = getCenter(locations);
  return center;
};

// mapping is based on the AGS (amtlicher Gemeindeschlüssel)
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

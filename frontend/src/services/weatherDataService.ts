import axios from "axios";
import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import { formatDate } from "@/utils/timeTransformation";
import { calculateCenterLongLat } from "@/utils/geoTransformation";
import { useDataStore } from "@/stores/data";
import { useNotificationStore } from "@/stores/notifications";
import { LocationLevel } from "../types/metadata";

type location = {
  latitude: number;
  longitude: number;
};

type WeatherFilterParams = {
  locations: location[] | undefined;
  startTime: string;
  endTime: string;
};

class WeatherService extends BaseService {
  transformFilterParams(filterParams: FilterParams): WeatherFilterParams {
    const dataStore = useDataStore();

    // format dates
    const startTime = filterParams.startDate
      ? formatDate(filterParams.startDate) + "T00:00:00"
      : "";
    const endTime = filterParams.endDate
      ? formatDate(filterParams.endDate) + "T23:00:00"
      : "";

    // get center long lat from location
    const locationLevel: LocationLevel =
      filterParams.locationStates?.length > 0
        ? LocationLevel.states
        : filterParams.locationDistricts?.length > 0
        ? LocationLevel.districts
        : LocationLevel.germany;

    const relevantLocations: location[] | undefined = [];

    if (locationLevel === LocationLevel.germany) {
      // get center for every state
      const allStates = [
        "Schleswig-Holstein",
        "Hamburg",
        "Niedersachsen",
        "Bremen",
        "Nordrhein-Westfalen",
        "Hessen",
        "Rheinland-Pfalz",
        "Baden-Württemberg",
        "Bayern",
        "Saarland",
        "Berlin",
        "Brandenburg",
        "Mecklenburg-Vorpommern",
        "Sachsen",
        "Sachsen-Anhalt",
        "Thüringen",
      ];
      // find center for each state
      allStates.forEach((state) => {
        const additionalData = dataStore.kreisData.filter(
          (d) => state == d.bundesland
        );

        const center = calculateCenterLongLat(
          additionalData.map((d) => ({
            latitude: d.geoPoint.lat,
            longitude: d.geoPoint.lng,
          }))
        );
        if (center) {
          relevantLocations.push(center);
        }
      });
    }

    if (locationLevel === LocationLevel.states) {
      // find center for each state
      filterParams.locationStates.forEach((state) => {
        const additionalData = dataStore.kreisData.filter(
          (d) => state == d.bundesland
        );

        const center = calculateCenterLongLat(
          additionalData.map((d) => ({
            latitude: d.geoPoint.lat,
            longitude: d.geoPoint.lng,
          }))
        );
        if (center) {
          relevantLocations.push(center);
        }
      });
    }

    if (locationLevel === LocationLevel.districts) {
      // find center for each district
      filterParams.locationDistricts.forEach((district) => {
        const additionalData = dataStore.kreisData.filter(
          (d) => district == d.name
        );

        const center = calculateCenterLongLat(
          additionalData.map((d) => ({
            latitude: d.geoPoint.lat,
            longitude: d.geoPoint.lng,
          }))
        );
        if (center) {
          relevantLocations.push(center);
        }
      });
    }

    return {
      locations: relevantLocations,
      startTime: startTime,
      endTime: endTime,
    };
  }

  protected async performFetch(
    transformedFilterParams: WeatherFilterParams
  ): Promise<any> {
    const notificationStore = useNotificationStore();

    if (
      !transformedFilterParams.locations ||
      transformedFilterParams.locations.length === 0
    ) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    // Fetch weather data for all locations
    const allResponses = await Promise.all(
      transformedFilterParams.locations.map(async (location) => {
        const response = await axios.get(
          `https://api.brightsky.dev/weather?lat=${location.latitude}&lon=${location.longitude}&date=${transformedFilterParams.startTime}&last_date=${transformedFilterParams.endTime}&units=dwd&tz=Europe/Berlin`
        );

        if (!response.data?.weather || !response.data?.sources) {
          notificationStore.addNotification("Fehler beim Laden der Daten.");
        }

        // get additional data for the station
        const stationId = response.data.sources[0].dwd_station_id;
        const stationLatitude = response.data.sources[0].lat;
        const stationLongitude = response.data.sources[0].lon;

        // relevant columns for aggregation
        const numericCols = [
          "precipitation",
          "pressure_msl",
          "sunshine",
          "temperature",
          "wind_speed",
          "wind_direction",
          "cloud_cover",
          "dew_point",
          "relative_humidity",
          "visibility",
          "wind_gust_direction",
          "wind_gust_speed",
          "precipitation_probability",
          "precipitation_probability_6h",
          "solar",
          "relative_humidity",
        ];

        // Group data by day and calculate means
        const dailyMeans = Object.values(
          // acc = accumulator object to keep track
          response.data.weather.reduce((acc: any, entry: any) => {
            // get the day
            const day = entry.timestamp.split("T")[0];

            // initialize new day if it doesn't exist
            if (!acc[day]) {
              acc[day] = {
                Tag: day,
                count: {}, // tracks count per column
                ...numericCols.reduce(
                  (cols, col) => ({ ...cols, [col]: 0 }), // initialize all numeric values to 0
                  {}
                ),
              };
            }

            numericCols.forEach((col) => {
              // skips null, undefined, and NaN values (but counts 0)
              if (entry[col] != null && !Number.isNaN(entry[col])) {
                acc[day][col] += entry[col]; // add value to sum
                acc[day].count[col] = (acc[day].count[col] || 0) + 1; // increment count
              }
            });

            return acc;
          }, {})
        ).map((dayData: any) => ({
          day: dayData.Tag,
          ...numericCols.reduce(
            (cols, col) => ({
              ...cols,
              // only divide if we have values for this column
              [col]: dayData.count[col]
                ? dayData[col] / dayData.count[col] // calculate average
                : null,
            }),
            {}
          ),
          // todo:should we include these in the download?
          dwd_station_id: stationId,
          station_latitude: stationLatitude,
          station_longitude: stationLongitude,
        }));
        return dailyMeans;
      })
    );

    // Combine all weather data
    return allResponses.flat();
  }

  filterData(data: any, filterParams: WeatherFilterParams): any {
    const notificationStore = useNotificationStore();
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    // info: no filtering needed as only relevant retrieved (time and location)
    return data;
  }
}

export { WeatherService };

import axios from "axios";
import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import abwasserStandorte from "../data/2024_11_26_abwasser_standorte.json";
import { useDataStore } from "@/stores/data";
import { formatDate } from "@/utils/timeTransformation";
import { useNotificationStore } from "@/stores/notifications";

type WasteWaterFilterParams = {
  standorte: string[] | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

class WasteWaterDataService extends BaseService {
  transformFilterParams(filterParams: FilterParams): WasteWaterFilterParams {
    const dataStore = useDataStore();

    // format dates
    const startDate = filterParams.startDate
      ? formatDate(filterParams.startDate)
      : "";
    const endDate = filterParams.endDate
      ? formatDate(filterParams.endDate)
      : "";

    // adjust location
    const locationLevel =
      filterParams.locationStates?.length > 0
        ? "states"
        : filterParams.locationDistricts?.length > 0
        ? "districts"
        : "germany";

    // default (for germany or missings)
    let relevantStandorte: string[] | undefined = undefined;

    if (locationLevel === "states") {
      const additionalData = abwasserStandorte.filter((d: any) =>
        filterParams.locationStates.includes(d.Bundesland)
      );
      relevantStandorte = additionalData.map((d: any) => d["Kläranlage"]);
    } else if (locationLevel === "districts") {
      // get Bundesländer for selected districts
      const additionalData = dataStore.kreisData.filter((d) =>
        filterParams.locationDistricts.includes(d.name)
      );
      const relevant_bundesländer = additionalData.map((d) => d.bundesland);
      // match with standorte data
      const standorte = abwasserStandorte.filter((d: any) =>
        relevant_bundesländer.includes(d.Bundesland)
      );

      relevantStandorte = standorte.map((d: any) => d["Kläranlage"]);
      // todo: improvement: get closest standorte from long lat?
    }
    return {
      startDate: startDate,
      endDate: endDate,
      standorte: relevantStandorte,
    };
  }

  protected async performFetch(): Promise<any> {
    const notificationStore = useNotificationStore();

    // fetch data from URL from GitHub
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/robert-koch-institut/Abwassersurveillance_AMELAG/main/amelag_einzelstandorte.tsv`
      );

      // parse the fetched data
      const data = response.data;
      const rows: string[] = data.split("\n");
      const headers: string[] = rows[0].split("\t");
      rows.shift();
      rows.pop();
      const parsedData = rows.map((row) => {
        const rowValues: string[] = row.split("\t");
        const rowObject: { [key: string]: string } = {};
        headers.forEach((header, index) => {
          rowObject[header] = rowValues[index];
        });
        return rowObject;
      });

      return parsedData;
    } catch (error) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
    }
  }
  filterData(data: any, filterParams: WasteWaterFilterParams): any {
    const notificationStore = useNotificationStore();

    // case: no data / filtering
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    let filteredRows = data.rows;

    // location
    if (filterParams.standorte?.length) {
      filteredRows = filteredRows.filter((row: any) =>
        filterParams.standorte!.includes(row.standort)
      );
    }
    // time
    if (filterParams.startDate) {
      filteredRows = filteredRows.filter(
        (row: any) => row.datum >= filterParams.startDate!
      );
    }

    if (filterParams.endDate) {
      filteredRows = filteredRows.filter(
        (row: any) => row.datum <= filterParams.endDate!
      );
    }

    // case: no results
    if (filteredRows.length === 0) {
      notificationStore.addNotification(
        "Für die gewählten Filterkriterien wurden keine Einrichtungen gefunden. Es wurde der ungefilterte Datensatz dem Export hinzugefügt."
      );
      return {
        ...data,
      };
    }

    // Return new object with filtered rows
    return {
      ...data,
      rows: filteredRows,
    };
  }
}

export { WasteWaterDataService };

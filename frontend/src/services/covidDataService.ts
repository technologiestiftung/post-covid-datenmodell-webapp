import axios from "axios";
import { type fetchedDataset } from "@/types/export";
import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import { reverseBundeslandMapper } from "@/utils/geoTransformation";
import { useDataStore } from "@/stores/data";
import { formatDate } from "@/utils/timeTransformation";
import { useNotificationStore } from "@/stores/notifications";
import { LocationLevel } from "../types/metadata";

type CovidFilterParams = {
  states: string[] | undefined;
  ageGroups: string[] | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

class CovidDataService extends BaseService {
  transformFilterParams(filterParams: FilterParams): CovidFilterParams {
    const dataStore = useDataStore();

    // format dates
    const startDate = filterParams.startDate
      ? formatDate(filterParams.startDate)
      : "";
    const endDate = filterParams.endDate
      ? formatDate(filterParams.endDate)
      : "";

    // location transformation
    const locationLevel: LocationLevel =
      filterParams.locationStates?.length > 0
        ? LocationLevel.states
        : filterParams.locationDistricts?.length > 0
        ? LocationLevel.districts
        : LocationLevel.germany;

    // default (for germany or missings)
    let relevantStates: string[] | undefined = undefined;

    if (locationLevel === LocationLevel.states) {
      // we can pass the states but need different mapping (id)
      relevantStates = filterParams.locationStates?.map(
        (state) => reverseBundeslandMapper[state]
      );
    } else if (locationLevel === LocationLevel.districts) {
      // get Bundesländer for selected districts
      const additionalData = dataStore.kreisData.filter((d) =>
        filterParams.locationDistricts.includes(d.name)
      );
      const unmappedStates = additionalData.map((d) => d.bundesland);
      relevantStates = unmappedStates.map(
        (state) => reverseBundeslandMapper[state]
      );
    }

    // age group transformation
    let relevantAgeGroups: string[] | undefined = undefined;
    if (filterParams.age) {
      // catch "alle" category
      if (filterParams.age.includes("00+")) {
        relevantAgeGroups = [];
      } else {
        relevantAgeGroups = filterParams.age;
      }
    }

    return {
      startDate: startDate,
      endDate: endDate,
      states: relevantStates,
      ageGroups: relevantAgeGroups,
    };
  }

  protected async performFetch(): Promise<any> {
    const notificationStore = useNotificationStore();

    // get data from GitHub url
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/robert-koch-institut/COVID-19_7-Tage-Inzidenz_in_Deutschland/refs/heads/main/COVID-19-Faelle_7-Tage-Inzidenz_Bundeslaender.csv`
      );
      // parse the csv data
      const csvData = response.data;
      const rows = csvData.split("\n");
      const headers: string[] = rows[0].split(",");

      const parsedData = [];

      for (let i = 1; i < rows.length; i++) {
        const row: string[] = rows[i].split(",");
        if (row.length == headers.length) {
          const rowData: { [key: string]: string } = {};
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }
          parsedData.push(rowData);
        }
      }

      return parsedData;
    } catch (error) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
    }
  }
  filterData(data: any, filterParams: CovidFilterParams): any {
    const notificationStore = useNotificationStore();
    // case: no data / filtering
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    // todo: handle out of frame time
    let filteredRows = data.rows;

    // location
    if (filterParams.states?.length) {
      filteredRows = filteredRows.filter((row: any) =>
        filterParams.states!.includes(row.Bundesland_id)
      );
    }
    // time
    if (filterParams.startDate) {
      filteredRows = filteredRows.filter(
        (row: any) => row.Meldedatum >= filterParams.startDate!
      );
    }

    if (filterParams.endDate) {
      filteredRows = filteredRows.filter(
        (row: any) => row.Meldedatum <= filterParams.endDate!
      );
    }

    // age
    if (filterParams.ageGroups?.length) {
      console.log("filterParams.age_groups", filterParams.ageGroups);
      filteredRows = filteredRows.filter((row: any) =>
        filterParams.ageGroups!.includes(row.Altersgruppe)
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

export { CovidDataService };

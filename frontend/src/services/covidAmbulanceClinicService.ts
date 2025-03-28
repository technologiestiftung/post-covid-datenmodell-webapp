import ambulanceClinicData from "../data/2024-12-02_post_covid_ambulanzen_kliniken.json";
import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import { useDataStore } from "@/stores/data";
import { useNotificationStore } from "@/stores/notifications";
import { LocationLevel } from "../types/metadata";

type ClinicFilterParams = {
  states: string[] | undefined;
  zip_codes: string[] | undefined;
};
// todo: we can also combine this to facilityIds

class CovidAmbulanceClinicService extends BaseService {
  transformFilterParams(filterParams: FilterParams): ClinicFilterParams {
    // info: for this service only location is relevant

    const dataStore = useDataStore();

    const locationLevel: LocationLevel =
      filterParams.locationStates?.length > 0
        ? LocationLevel.states
        : filterParams.locationDistricts?.length > 0
        ? LocationLevel.districts
        : LocationLevel.germany;

    if (locationLevel === LocationLevel.states) {
      //states can just be passed as they are
      return { states: filterParams.locationStates, zip_codes: undefined };
    } else if (locationLevel === LocationLevel.districts) {
      // get additional data for the districts
      const additionalData = dataStore.kreisData.filter((d) =>
        filterParams.locationDistricts.includes(d.name)
      );
      // collect relevant zip codes
      const relevantZipCodes = additionalData.map((d) => d.zipCode);
      return { states: undefined, zip_codes: relevantZipCodes };
    } else {
      return { states: undefined, zip_codes: undefined };
    }
  }

  protected async performFetch(): Promise<any> {
    const notificationStore = useNotificationStore();
    try {
      // Load data from JSON file
      const data = ambulanceClinicData;

      return data["data"];
    } catch (error) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");

      return [];
    }
  }
  filterData(data: any, filterParams: ClinicFilterParams): any {
    const notificationStore = useNotificationStore();

    // case: no data / filtering
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    let filteredRows = data.rows;

    // case: state filtering
    if (filterParams.states) {
      filteredRows = filteredRows.filter((d: any) =>
        filterParams.states!.includes(d["state"])
      );
    }
    // case: zip code filtering
    if (filterParams.zip_codes) {
      filteredRows = filteredRows.filter((d: any) =>
        filterParams.zip_codes!.includes(d["zip"])
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

export { CovidAmbulanceClinicService };

import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import { findNearestRehaLocation } from "@/utils/geoTransformation";
import rehabilitationData from "../data/2024-12-02_post_covid_reha.json";
import { useNotificationStore } from "@/stores/notifications";
import { LocationLevel } from "../types/metadata";

type RehabFilterParams = {
  facilityIds: string[] | undefined;
};

class CovidRehabilitationService extends BaseService {
  transformFilterParams(filterParams: FilterParams): RehabFilterParams {
    // info: for this service only location is relevant
    const locationLevel: LocationLevel =
      filterParams.locationStates?.length > 0
        ? LocationLevel.states
        : filterParams.locationDistricts?.length > 0
        ? LocationLevel.districts
        : LocationLevel.germany;

    const relevantFacilities: any[] = [];

    if (locationLevel === LocationLevel.states) {
      filterParams.locationStates.forEach((state) => {
        relevantFacilities.push(findNearestRehaLocation(state, "state"));
      });
    } else if (locationLevel === LocationLevel.districts) {
      filterParams.locationDistricts.forEach((district) => {
        relevantFacilities.push(findNearestRehaLocation(district, "districts"));
      });
    }
    const relevantFacilityIds = relevantFacilities.map((f) => f.uid);
    return { facilityIds: relevantFacilityIds };
  }

  protected async performFetch(): Promise<any> {
    const notificationStore = useNotificationStore();

    try {
      // Load data from JSON file
      const data = rehabilitationData;

      return data["data"];
    } catch (error) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }
  }
  filterData(data: any, filterParams: RehabFilterParams): any {
    const notificationStore = useNotificationStore();

    // case: no data / filtering
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }
    let filteredRows = data.rows;

    if (filterParams.facilityIds?.length) {
      filteredRows = filteredRows.filter((row: any) =>
        filterParams.facilityIds!.includes(row.uid)
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

export { CovidRehabilitationService };

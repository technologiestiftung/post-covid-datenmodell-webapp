import { type FilterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import airQualityData from "../data/2025-03-31_air_quality_states_schadstoffe.json";
import { useNotificationStore } from "@/stores/notifications";

type AirQualityFilterParams = {
  standorte: string[] | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

class AirQualityService extends BaseService {
  // todo: implement filter transformation when API available
  transformFilterParams(filterParams: FilterParams): AirQualityFilterParams {
    // set static filter params
    return { standorte: [], startDate: "2024-01-01", endDate: "2024-12-31" };
  }

  protected async performFetch(): Promise<any> {
    const notificationStore = useNotificationStore();

    try {
      // Load data from JSON file
      const data = airQualityData;

      return data;
    } catch (error) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }
  }

  // todo: implement filtering when API available
  filterData(data: any, filterParams: AirQualityFilterParams): any {
    const notificationStore = useNotificationStore();

    // case: no data / filtering
    if (!data || !data.rows) {
      notificationStore.addNotification("Fehler beim Laden der Daten.");
      return [];
    }

    const filteredRows = data.rows;

    notificationStore.addNotification(
      "API ist nicht ansprechbar. Beispieldaten werden bereitgestellt."
    );

    // Return new object with filtered rows
    return {
      ...data,
      rows: filteredRows,
    };
  }
}

export { AirQualityService };

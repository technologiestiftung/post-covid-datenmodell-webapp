import ambulanceClinicData from "../data/2024-12-02_post_covid_ambulanzen_kliniken.json";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type ClinicFilterParams = {
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
};

class CovidAmbulanceClinicService extends BaseService {
  transformFilterParams(filterParams: filterParams): ClinicFilterParams {
    const transformedFilterParams = {
      start_time: filterParams.start_date,
      end_time: filterParams.end_date,
      latitude: 52.4993, // todo: get from location
      longitude: 13.3914, // todo: get from location
    };
    return transformedFilterParams;
  }

  protected async performFetch(filterParams: ClinicFilterParams): Promise<any> {
    try {
      // Load data from JSON file
      const data = ambulanceClinicData;

      return data["data"];
    } catch (error) {
      console.error("Error loading hospitals data:", error);
      return [];
    }
  }
}

export { CovidAmbulanceClinicService };

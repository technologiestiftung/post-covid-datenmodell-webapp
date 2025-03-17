import rehabilitationData from "../data/2024-12-02_post_covid_reha.json";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type RehabFilterParams = {
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
};

class CovidRehabilitationService extends BaseService {
  transformFilterParams(filterParams: filterParams): RehabFilterParams {
    const transformedFilterParams = {
      start_time: filterParams.start_date,
      end_time: filterParams.end_date,
      latitude: 52.4993, // todo: get from location
      longitude: 13.3914, // todo: get from location
    };
    return transformedFilterParams;
  }
  protected async performFetch(filterParams: RehabFilterParams): Promise<any> {
    try {
      // Load data from JSON file
      const data = rehabilitationData;

      return data["data"];
    } catch (error) {
      console.error("Error loading rehabilitation data:", error);
      return [];
    }
  }
}

export { CovidRehabilitationService };

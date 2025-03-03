import axios from "axios";
import { type fetchedDataset } from "@/types/export";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type transformedFilterParams = {
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
};

class WeatherService extends BaseService {
  transformFilterParams(filterParams: filterParams) {
    const start_time_timed = filterParams.start_date + "T00:00:00";
    const end_time_timed = filterParams.end_date + "T23:00:00";

    // todo: get long lat from plz
    const latitude = 52.520008;
    const longitude = 13.404954;

    const transformedFilterParams = {
      latitude: latitude,
      longitude: longitude,
      start_time: start_time_timed,
      end_time: end_time_timed,
    };
    return transformedFilterParams;
  }

  fetchData = async (filterParams: transformedFilterParams) => {
    try {
      const response = await axios.get(
        `https://api.brightsky.dev/weather?lat=${filterParams.latitude}&lon=${filterParams.longitude}&date=${filterParams.start_time}&last_date=${filterParams.end_time}&units=dwd&tz=Europe/Berlin`
      );
      // todo: catch empty data?

      return response.data.weather;
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // function to transform in the desired fetchedDataset format
  transformData = (jsonData: any): fetchedDataset => {
    if (jsonData.length == 0) {
      return { headers: [], rows: [] };
    } else {
      const headers = Object.keys(jsonData[0]);
      const rows = jsonData
      return { headers: headers, rows: rows };
    }
  };
}

export { WeatherService };

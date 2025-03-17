import axios from "axios";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type WeatherFilterParams = {
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
}

class WeatherService extends BaseService {
  transformFilterParams(filterParams: filterParams): WeatherFilterParams {
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

  protected async performFetch(filterParams: WeatherFilterParams): Promise<any> {
    const response = await axios.get(
      `https://api.brightsky.dev/weather?lat=${filterParams.latitude}&lon=${filterParams.longitude}&date=${filterParams.start_time}&last_date=${filterParams.end_time}&units=dwd&tz=Europe/Berlin`
    );   
    
    if (!response.data?.weather) {
      throw new Error('No weather data available');
    }   
    
    return response.data.weather;
  }
}

export { WeatherService };

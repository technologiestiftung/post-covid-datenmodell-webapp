import rehabilitationData from '../data/2024-12-02_post_covid_reha.json';
import { type fetchedDataset } from "@/types/export";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type transformedFilterParams = {
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
};

class CovidRehabilitationService extends BaseService {
  transformFilterParams(filterParams: filterParams) {
    

    const transformedFilterParams = {    
      start_time: filterParams.start_date,
      end_time: filterParams.end_date ,
    };
    return transformedFilterParams;
  }

  fetchData = async (filterParams: transformedFilterParams) => {
    try {
      // Load data from JSON file
      const data = rehabilitationData;     
   
      
      return  data["data"];
    } catch (error) {
      console.error('Error loading rehabilitation data:', error);
      return [];
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

export { CovidRehabilitationService };

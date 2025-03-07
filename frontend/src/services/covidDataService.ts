import axios from "axios";
import { type fetchedDataset } from "@/types/export";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";
import { he } from "vuetify/locale";

type transformedFilterParams = {
  bundesland: string;
  age_group: string | null;
  start_time: string;
  end_time: string;
};

class CovidDataService extends BaseService {
  transformFilterParams(filterParams: filterParams) {
    const bundesland = "01";

    const transformedFilterParams = {
      bundesland: bundesland,
      age_group: null,
      start_time: filterParams.start_date,
      end_time: filterParams.end_date,
    };
    return transformedFilterParams;
  }

  fetchData = async (filterParams: transformedFilterParams) => {
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

      // filter by filterParams
      const filteredData = parsedData.filter(
        (row) =>
          row["Bundesland_id"] == filterParams.bundesland &&
          row["Meldedatum"] >= filterParams.start_time &&
          row["Meldedatum"] <= filterParams.end_time
      );

      return filteredData;
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

export { CovidDataService };

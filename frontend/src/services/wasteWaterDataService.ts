import axios from "axios";
import { type fetchedDataset } from "@/types/export";
import { type filterParams } from "@/types/metadata";
import { BaseService } from "./baseService";

type transformedFilterParams = {
  standort: string;
  type: string;
  start_time: string;
  end_time: string;
};

class WasteWaterDataService extends BaseService {
  transformFilterParams(filterParams: filterParams) {
    // TODO: Implement the transformation of the filterParams
    const standort = 'Aachen';
    const type = 'SARS-CoV-2';

    const transformedFilterParams = {
      standort: standort,
      type: type,
      start_time: filterParams.start_date,
      end_time: filterParams.end_date,
    };
    return transformedFilterParams;
  }

  fetchData = async (filterParams: transformedFilterParams) => {
    // fetch data from URL from GitHub
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/robert-koch-institut/Abwassersurveillance_AMELAG/main/amelag_einzelstandorte.tsv`
      );

      // parse the fetched data
      const data = response.data;
      const rows: string[] = data.split("\n");
      const headers: string[] = rows[0].split("\t");
      rows.shift();
      rows.pop();
      const parsedData = rows.map((row) => {
        const rowValues: string[] = row.split("\t");
        const rowObject: { [key: string]: string } = {};
        headers.forEach((header, index) => {
          rowObject[header] = rowValues[index];
        });
        return rowObject;
      });

      // filter data based on filterParams
      const filteredData = parsedData.filter((row) => {
        return (
          row["standort"] == filterParams.standort &&
          row["typ"] == filterParams.type &&
          row["datum"] >= filterParams.start_time &&
          row["datum"] <= filterParams.end_time
        );
      });

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

export { WasteWaterDataService };

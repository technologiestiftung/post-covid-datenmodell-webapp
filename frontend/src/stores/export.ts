import { ref } from "vue";
import { defineStore } from "pinia";
import { type exportListItem } from "../types/export";

// services
import { WeatherService } from "@/services/weatherDataService";
import { CovidAmbulanceClinicService } from "@/services/covidAmbulanceClinicService";
import { BaseService } from "@/services/baseService";
import { CovidDataService } from "@/services/covidDataService";

// mapping from id to services
// service registry -> we use Map here for type safety instead of an Object
const serviceRegistry = new Map<string, BaseService>([
  ["weather", new WeatherService()],
  ["covid-hospitals", new CovidAmbulanceClinicService()],
  ["covid-cases", new CovidDataService()],
  // to add more services -> you can find the id's in data/2025...
]);

export const useExportStore = defineStore(
  "export",
  () => {
    const exportDatasets = ref<exportListItem[]>([]);

    // function to find the right service in serviceRegistry
    const getService = (id: string): BaseService | undefined => {
      const service = serviceRegistry.get(id);
      if (service) {
        return service;
      }
      return service;
    };

    const addToExport = async (id: string) => {
      const service = getService(id); // getting the right service
      // todo: get the filter params from frontend / filter store
      const transformedFilterParams = service?.transformFilterParams({
        start_date: "2022-01-01",
        end_date: "2022-02-01",
        location_plz: "10115",
        gender: "",
        age: "",
      });
      const fetchedData = await service?.fetchData(transformedFilterParams);
      // todo: filter data
      const transformedData = service?.transformData(fetchedData);

      exportDatasets.value.push({
        id: id,
        data: transformedData!,
        export_fields: [], // initialize empty
        format: "csv", // default format
      });
    };

    const removeFromExport = (id: string) => {
      exportDatasets.value = exportDatasets.value.filter(
        (dataset) => dataset.id !== id
      );
    };

    const updateAttributeExportFields = (id: string, fields: string[]) => {
      const datasetIndex = exportDatasets.value.findIndex(
        (dataset) => dataset.id === id // returns -1 if not found
      );

      if (datasetIndex !== -1) {
        exportDatasets.value[datasetIndex] = {
          ...exportDatasets.value[datasetIndex], // all existing properties
          export_fields: fields, // and overwrites export_fields
        };
      }
    };
    const updateDataFormatExportField = (
      id: string,
      dataFormat: exportListItem["format"]
    ) => {
      const datasetIndex = exportDatasets.value.findIndex(
        (dataset) => dataset.id === id // returns -1 if not found
      );

      if (datasetIndex !== -1) {
        exportDatasets.value[datasetIndex] = {
          ...exportDatasets.value[datasetIndex], // all existing properties
          format: dataFormat, // and overwrites data format
        };
      }
    };

    // todo: implement download data + filter data beforehand
    const downloadData = () => {
      console.log("download data");
    };

    return {
      exportDatasets,
      addToExport,
      removeFromExport,
      updateAttributeExportFields,
      updateDataFormatExportField,
      downloadData,
    };
  },
  {
    persist: true,
  }
);

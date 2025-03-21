import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFilterStore } from "./filters";
import { type exportListItem } from "../types/export";
import { useNotificationStore } from "./notifications";

// services
import { WeatherService } from "@/services/weatherDataService";
import { CovidRehabilitationService } from "@/services/covidRehabilitationService";
import { CovidAmbulanceClinicService } from "@/services/covidAmbulanceClinicService";
import { BaseService } from "@/services/baseService";
import { CovidDataService } from "@/services/covidDataService";
import { WasteWaterDataService } from "@/services/wasteWaterDataService";

// mapping from id to services
// service registry -> we use Map here for type safety instead of an Object
const serviceRegistry = new Map<string, BaseService>([
  ["weather", new WeatherService()],
  ["covid-rehabilitation", new CovidRehabilitationService()],
  ["covid-hospitals", new CovidAmbulanceClinicService()],
  ["covid-cases", new CovidDataService()],
  ["sewage-water", new WasteWaterDataService()],
  // to add more services -> you can find the id's in data/2025...
]);

export const useExportStore = defineStore(
  "export",
  () => {
    const notificationStore = useNotificationStore();
    const filterStore = useFilterStore();
    const exportDatasets = ref<exportListItem[]>([]);
    const isDataLoading = ref(false);
    const isLoading = ref(false);

    // function to find the right service in serviceRegistry
    const getService = (id: string): BaseService | undefined => {
      const service = serviceRegistry.get(id);
      if (service) {
        service.onStateChange = (loading) => {
          isLoading.value = loading;
        };
      }
      return service;
    };

    const addToExport = async (id: string) => {
      try {
        isDataLoading.value = true;
        const service = getService(id);

        if (!service) {
          notificationStore.addNotification(
            "Diese Daten sind momentan nicht verfügbar"
          );
          throw new Error(`Service not found for id: ${id}`);
        }

        const transformedFilterParams = service.transformFilterParams(
          filterStore.filterParams
        );
        const fetchedData = await service.fetchData(transformedFilterParams);
        const transformedData = service.getTransformedData(fetchedData);
        const filteredData = service.filterData(
          transformedData!,
          transformedFilterParams
        );

        // catch empty data
        if (!filteredData) {
          // abort adding to export
          return;
        }

        exportDatasets.value.push({
          id: id,
          data: filteredData,
          export_fields: [],
          format: "csv",
        });
      } catch (error) {
        notificationStore.addNotification("Fehler beim Hinzufügen zum Export");
      } finally {
        isDataLoading.value = false;
      }
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

    const downloadData = () => {
      const timestamp = new Date().toISOString().split("T")[0];

      for (const dataset of exportDatasets.value) {
        if (dataset.format === "csv") {
          const data = dataset.data;
          const headers =
            dataset.export_fields.length > 0
              ? dataset.export_fields
              : Object.keys(data.rows[0]);

          let csvContent = "data:text/csv;charset=utf-8,";
          csvContent += headers.join(",") + "\n";
          data.rows.forEach((row) => {
            csvContent += headers.map((header) => row[header]).join(",") + "\n";
          });

          const url = encodeURI(csvContent);

          const link = document.createElement("a");
          link.href = url;
          link.download = `${timestamp}-${dataset.id}-export.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else if (dataset.format === "json") {
          const data = dataset.data;
          const headers =
            dataset.export_fields.length > 0
              ? dataset.export_fields
              : Object.keys(data.rows[0]);
          console.log(headers);
          const filteredData = data.rows.map((row) => {
            const filteredRow: Record<string, any> = {};
            headers.forEach((header) => {
              filteredRow[header] = row[header];
            });
            return filteredRow;
          });

          const jsonString = JSON.stringify(filteredData, null, 2);

          const blob = new Blob([jsonString], { type: "application/json" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${timestamp}-${dataset.id}-export.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      }
    };

    return {
      exportDatasets,
      addToExport,
      removeFromExport,
      updateAttributeExportFields,
      updateDataFormatExportField,
      downloadData,
      isLoading,
    };
  },
  {
    persist: true,
  }
);

import { defineStore } from "pinia";
import { ref } from "vue";
import { type exportListItem } from "../types/export";

export const useMatchedDataStore = defineStore("matchedData", () => {
  const currentMatch = ref<exportListItem | undefined>(undefined);

  const setMatchedData = (matchData: exportListItem) => {
    currentMatch.value = matchData;
  };

  const clearMatchedData = () => {
    currentMatch.value = undefined;
  };

  // todo: function from export store slightly modified maybe we can combine them in the future
  const downloadMatch = () => {
    const timestamp = new Date().toISOString().split("T")[0];

    if (currentMatch.value) {
      if (currentMatch.value.format === "csv") {
        const data = currentMatch.value.data;
        const headers =
          currentMatch.value.export_fields.length > 0
            ? currentMatch.value.export_fields.concat(["patient_id"]) // add patient_id to export fields
            : Object.keys(data.rows[0]);

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += headers.join(",") + "\n";
        data.rows.forEach((row) => {
          csvContent += headers.map((header) => row[header]).join(",") + "\n";
        });

        const url = encodeURI(csvContent);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${timestamp}-${currentMatch.value.id}-export.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else if (currentMatch.value.format === "json") {
        const data = currentMatch.value.data;
        const headers =
          currentMatch.value.export_fields.length > 0
            ? currentMatch.value.export_fields.concat(["patient_id"]) // add patient_id to export fields
            : Object.keys(data.rows[0]);
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
        link.download = `${timestamp}-${currentMatch.value.id}-export.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    }
  };

  return {
    currentMatch,
    setMatchedData,
    clearMatchedData,
    downloadMatch,
  };
});

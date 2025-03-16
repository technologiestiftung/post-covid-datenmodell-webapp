// Utilities
import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { Attribute, Category, LocationLevel } from "../types/metadata";
import { type FilterParams } from "../types/metadata";
import { useDataStore } from "../stores/data";

export const useFilterStore = defineStore(
  "filters",
  () => {
    const dataStore = useDataStore();
    const allData = dataStore.metaData;

    const filterCategory = ref<Category | undefined>(undefined);
    const attributes = ref<Attribute[]>();

    // Replace ref with computed
    const filteredData = computed(() => {
      let result = allData;

      // Filter by category if one is selected
      if (filterCategory.value) {
        result = result.filter(
          (item) => item.category === filterCategory.value
        );
      }

      return result;
    });

    // FilterParams
    const filterParams = ref<FilterParams>({
      start_date: "",
      end_date: "",
      locationStates: [],
      locationDistricts: [],
      age: ["00+"],
    });

    return { filterCategory, attributes, filterParams, filteredData };
  },
  {
    persist: true,
  }
);

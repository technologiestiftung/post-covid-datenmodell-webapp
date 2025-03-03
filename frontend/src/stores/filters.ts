// Utilities
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Attribute, Category } from "../types/metadata";
import { useDataStore } from "../stores/data";

export const useFilterStore = defineStore(
  "filters",
  () => {
    const dataStore = useDataStore();
    const allData = dataStore.metaData;

    const filterCategory = ref<Category | undefined>(undefined);
    const attributes = ref<Attribute[]>();
    const filterParams = ref<string[]>([]);

    // Replace ref with computed
    const filteredData = computed(() => {
      let result = allData;

      // Filter by category if one is selected
      if (filterCategory.value) {
        result = result.filter(
          (item) => item.category === filterCategory.value
        );
      }

      // Apply additional filters from filterParams if they exist
      if (filterParams.value && filterParams.value.length > 0) {
        result = result.filter((item) =>
          filterParams.value.every((param) =>
            item.filter_attributes.includes(param)
          )
        );
      }

      return result;
    });

    return { filterCategory, attributes, filterParams, filteredData };
  },
  {
    persist: true,
  }
);

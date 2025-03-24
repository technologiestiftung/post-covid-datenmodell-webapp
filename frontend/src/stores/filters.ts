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

    const favorites = ref<string[]>([]);
    const showFavorites = ref<boolean>(false);

    const search = ref<string>("");

    // Replace ref with computed
    const filteredData = computed(() => {
      let result = allData;

      // first check: if favorites are selected and showFavorites is true
      if (favorites.value.length > 0 && showFavorites.value) {
        result = allData.filter((item) => favorites.value.includes(item.id));
        return result;
      }

      // Filter by category if one is selected
      if (filterCategory.value) {
        result = result.filter(
          (item) => item.category === filterCategory.value
        );
        return result;
      }

      // Filter by search
      if (search.value) {
        result = result.filter((item) =>
          item.title.toLowerCase().includes(search.value.toLowerCase()) || 
          item.description.toLowerCase().includes(search.value.toLowerCase()) || 
          item.id.toLowerCase().includes(search.value.toLowerCase()) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(search.value.toLowerCase()))
        );

        return result;
      }

      return result;
    });

    // FilterParams
    const startDate = ref<string>("");
    const endDate = ref<string>("");
    const locationStates = ref<string[]>([]);
    const locationDistricts = ref<string[]>([]);
    const age = ref<string[]>(["00+"]);

    const filterParams = computed(() => {
      return {
        startDate: startDate.value,
        endDate: endDate.value,
        locationStates: locationStates.value,
        locationDistricts: locationDistricts.value,
        age: age.value,
      };
    });

    return {
      filterCategory,
      attributes,
      filterParams,
      filteredData,
      startDate,
      endDate,
      locationStates,
      locationDistricts,
      age,
      favorites,
      showFavorites,
      search,
    };
  },
  {
    persist: true,
  }
);

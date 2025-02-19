// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";
import { Attribute, Category } from "../types/metadata";

export const useFilterStore = defineStore(
  "filters",
  () => {
    const filterCategory = ref<Category | undefined>(undefined);
    const attributes = ref<Attribute[]>(); // MII-Schlüsselattribute

    return { filterCategory, attributes };
  },
  {
    persist: true, // makes store persistent (for example on reload)
  }
);

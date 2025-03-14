<template>
  <div class="d-flex flex-column" style="min-height: 90vh">
    <v-row class="justify-center flex-grow-0 pt-4">
      <v-col cols="11" md="10" xl="6">
        <div class="d-flex">
          <h1 class="text-secondary">Metadatenkatalog</h1>
          <AppInformation metric="metadatenkatalog" />
        </div>
      </v-col>
    </v-row>
    <!-- Kategorien -->
    <v-row class="justify-center flex-grow-0">
      <v-col cols="11" md="8" xl="6">
        <b>Kategorie</b>
        <FilterCategories />
      </v-col>
    </v-row>
    <!-- Schlüsselattribute -->
    <v-row class="justify-center flex-grow-0">
      <v-col cols="11" md="8" xl="6">
        <b>MII-Schlüsselattribute</b>
        <AttributeCategories />
      </v-col>
    </v-row>
    <!-- Data Cards -->
    <v-row class="justify-center flex-grow-1" style="background-color: #eaeaf6">
      <v-col cols="11" md="8" xl="6">
        <!-- todo: add Schlagworte here? -->
        <p class="py-4">
          <b> {{ filteredData.length }}</b>
          {{
            filteredData.length === 1
              ? "Datensatz gefunden"
              : "Datensätze gefunden"
          }}
          {{ filterStore.filterCategory ? filterStore.filterCategory : "" }}
        </p>
        <AppFavoriteBar />
        <div v-for="item in paginatedItems" :key="item.id">
          <MetaDataCard :data-entry="item" :export-view="false" />
        </div>
      </v-col>
    </v-row>
    <v-row class="flex-grow-0">
      <v-col>
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="
        (newPage: number) => {
          page = newPage;
        }
      "
          class="mt-4"
      /></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDataStore } from "../stores/data";
import { useFilterStore } from "../stores/filters";
import MetaDataCard from "../components/MetaDataCard.vue";
import FilterCategories from "../components/FilterCategories.vue";
import AttributeCategories from "../components/AttributeCategories.vue";
import AppInformation from "../components/AppInformation.vue";
import AppFavoriteBar from "../components/AppFavoriteBar.vue";
import { useExportStore } from "../stores/export";

const exportedData = computed(() => exportStore.exportDatasets);

const exportStore = useExportStore();
const dataStore = useDataStore();
const filterStore = useFilterStore();
const filteredData = computed(() => filterStore.filteredData);

// PAGINATION
// need to save this as variable so I can watch it
const filterCategory = computed(() => {
  return filterStore.filterCategory;
});

const page = ref<number>(1);
const itemsPerPage: number = 2;

// todo: add Schlüsselattribute
watch(filterCategory, () => {
  page.value = 1;
});

const pageCount = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});
</script>

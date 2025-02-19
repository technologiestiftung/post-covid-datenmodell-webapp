<template>
  <div>
    <v-row class="justify-center pt-4" style="background-color: #fbfbfd">
      <v-col cols="11" md="10" xl="6">
        <div class="d-flex">
          <h1>Metadatenkatalog</h1>
          <AppInformation metric="metadatenkatalog" />
        </div>
      </v-col>
    </v-row>
    <!-- Kategorien -->
    <v-row class="justify-center" style="background-color: #fbfbfd">
      <v-col cols="11" md="10" xl="6">
        <b>Kategorie</b>
        <FilterCategories />
      </v-col>
    </v-row>
    <!-- Schlüsselattribute -->
    <v-row class="justify-center" style="background-color: #fbfbfd">
      <v-col cols="11" md="10" xl="6">
        <b>MII-Schlüsselattribute</b>
        <AttributeCategories />
      </v-col>
    </v-row>
    <!-- Data Cards -->
    <v-row class="justify-center">
      <v-col cols="11" md="10" xl="6">
        <!-- todo: add Schlagworte here? -->
        <p class="py-4">
          <b> {{ filteredData.length }}</b>
          {{
            filteredData.length === 1
              ? "Datensatz gefunden"
              : "Datensätze gefunden"
          }}
          {{ ": " + filterStore.filterCategory }}
        </p>
        <div v-for="item in filteredData" :key="item.id">
          <MetaDataCard :data-entry="item" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDataStore } from "../stores/data";
import { useFilterStore } from "../stores/filters";
import MetaDataCard from "../components/MetaDataCard.vue";
import FilterCategories from "../components/FilterCategories.vue";
import AttributeCategories from "../components/AttributeCategories.vue";
import AppInformation from "../components/AppInformation.vue";

const filteredData = computed(() => {
  if (filterStore.filterCategory) {
    return dataStore.metaData.filter(
      (item) => item.category === filterStore.filterCategory
    );
  }
  return dataStore.metaData;
});

const dataStore = useDataStore();
const filterStore = useFilterStore();
</script>

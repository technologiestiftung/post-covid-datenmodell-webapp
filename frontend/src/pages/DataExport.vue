<template>
  <div class="d-flex flex-column" style="min-height: 90vh">
    <v-row
      class="justify-center flex-grow-0 pt-4"
      style="background-color: #eaeaf6"
    >
      <v-col cols="11">
        <div class="d-flex">
          <h1 class="text-secondary">Datensatz-Export</h1>
          <AppInformation metric="metadatenkatalog" />
        </div>
      </v-col>
    </v-row>
    <!-- Data Cards -->
    <v-row
      v-if="exportItems.length > 0"
      class="justify-center flex-grow-1"
      style="background-color: #eaeaf6"
    >
      <v-col cols="11" md="7">
        <div v-for="item in exportItems" :key="item.id">
          <MetaDataCard :data-entry="item" :export-view="true" />
        </div>
      </v-col>
      <!-- Export Action -->
      <v-col cols="11" md="4">
        <ExportDataCard />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="11" class="d-flex justify-center">
        <v-card
          flat
          rounded="xl"
          class="mb-4"
          style="background-color: #fbfbfd"
        >
          <v-card-title> Keine Daten für den Export ausgwählt. </v-card-title>

          <v-btn
            color="primary"
            block
            class="text-white py-3"
            :to="{ name: 'DataList' }"
          >
            Zurück zum Metadatenkatalog
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDataStore } from "../stores/data";
import MetaDataCard from "../components/MetaDataCard.vue";
import AppInformation from "../components/AppInformation.vue";
import { useExportStore } from "../stores/export";
import ExportDataCard from "../components/ExportDataCard.vue";

const exportStore = useExportStore();
const dataStore = useDataStore();

const exportItems = computed(() => {
  return dataStore.metaData.filter((item) => {
    return exportStore.exportDatasets.some((dataset) => dataset.id === item.id);
  });
});
</script>

<template>
  <div style="min-height: 90vh; background-color: #eaeaf6">
    <v-row class="d-flex flex-column align-center pt-4">
      <v-col cols="11" md="9" xl="8">
        <div class="d-flex pb-8 pt-2">
          <h1 class="text-secondary">Datensatz-Export</h1>
          <AppInformation metric="export" />
        </div>
        <!-- Data Cards -->
        <v-row v-if="exportItems.length > 0" class="justify-center flex-grow-1">
          <v-col cols="11" md="8">
            <div v-for="item in exportItems" :key="item.id">
              <MetaDataCard :data-entry="item" :export-view="true" />
            </div>
          </v-col>
          <!-- Export Action -->
          <v-col cols="11" md="4">
            <ExportDataCard />
            <UnifiedDataExportCard />
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
              <v-card-text class="text-">
                Noch keine Daten für den Export ausgewählt...
              </v-card-text>

              <v-btn
                color="primary"
                block
                class="text-white py-3 px-4 text-none"
                :to="{ name: 'DataList' }"
                tile
              >
                Zurück zum Metadatenkatalog
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
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
import UnifiedDataExportCard from "../components/UnifiedDataExportCard.vue";

const exportStore = useExportStore();
const dataStore = useDataStore();

const exportItems = computed(() => {
  return dataStore.metaData.filter((item) => {
    return exportStore.exportDatasets.some((dataset) => dataset.id === item.id);
  });
});
</script>

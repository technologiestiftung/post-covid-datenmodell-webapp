<template>
  <div class="d-flex flex-column" id="success">
    <v-row
      class="justify-center flex-grow-0 py-8"
      style="background-color: #c6dee6"
    >
      <v-col cols="11" md="11" class="text-center">
        <div class="py-8 text-center">
          <h1 class="text-secondary">
            Ihre Daten wurden erfolgreich gesendet.
          </h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center flex-grow-0 py-8">
      <v-col cols="11" md="8">
        <div class="d-flex flex-column py-2 text-center">
          <div class="d-flex">
            <v-spacer></v-spacer
            ><v-icon size="124" color="primary">mdi-check-circle-outline</v-icon
            ><v-spacer></v-spacer>
          </div>
          <h2 class="text-secondary">Ihre Daten wurden gesendet!</h2>
          <div class="d-flex my-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="outlined"
              :to="{ name: 'DataSuggestion' }"
              rounded="xl"
              class="mx-1"
            >
              Weitere Daten vorschlagen
            </v-btn>

            <v-btn
              color="primary"
              variant="flat"
              :to="{ name: 'DataList' }"
              rounded="xl"
              class="mx-1"
            >
              Zum Metadatenkatalog
            </v-btn>
            <v-spacer></v-spacer>
          </div>
        </div>
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
import DataSuggestionForm from "../components/DataSuggestionForm.vue";

const exportStore = useExportStore();
const dataStore = useDataStore();

const exportItems = computed(() => {
  return dataStore.metaData.filter((item) => {
    return exportStore.exportDatasets.some((dataset) => dataset.id === item.id);
  });
});
</script>

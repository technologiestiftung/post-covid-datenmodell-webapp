<template>
  <div class="d-flex flex-column" style="min-height: 90vh">
    <v-row
      class="justify-center flex-grow-0 py-4"
      style="background-color: #c6dee6"
    >
      <v-col cols="11" md="9">
        <div class="d-flex">
          <h1 class="text-secondary">Datensatz vorschlagen</h1>
        </div>
        <v-row>
          <v-col cols="12" md="9">
            <p class="pb-2">
              Haben Sie einen relevanten Datensatz entdeckt? Schlagen Sie ihn
              hier für die Aufnahme in unseren Katalog vor. Geben Sie uns dazu
              einige grundlegende Informationen, und wir prüfen die Möglichkeit
              einer Aufnahme.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-center flex-grow-0 py-8">
      <v-col cols="11" md="8">
        <div class="d-flex py-2">
          <h2 class="text-secondary">Formular zum Datensatz ausfüllen</h2>
          <AppInformation metric="contactForm" />
        </div>
        <v-row>
          <v-col cols="11" md="8">
            <p class="pb-4">
              Bitte geben Sie grundlegende Informationen zum Datensatz an und
              hinterlassen Sie Ihre Kontaktdaten, damit wir Sie über die
              Entscheidung zur Aufnahme informieren können.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="justify-center flex-grow-0 py-8">
      <v-col cols="11" md="8">
        <DataSuggestionForm></DataSuggestionForm>
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

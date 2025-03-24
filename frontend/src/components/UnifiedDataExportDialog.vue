<template>
  <v-dialog max-width="1200px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        color="primary"
        variant="text"
        prepend-icon="mdi-open-in-app"
        v-bind="activatorProps"
      >
        Menü öffnen
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl">
        <v-toolbar color="transparent">
          <v-toolbar-title
            class="text-secondary font-weight-bold"
            style="width: 700px !important"
          >
            <v-icon class="mr-2">mdi-creation</v-icon>Export mit MII-Daten
            verknüpfen
          </v-toolbar-title>

          <v-toolbar-items>
            <v-btn
              v-show="!showFileInput"
              variant="text"
              prepend-icon="mdi-redo"
              color="primary"
              @click="resetFileInput"
            >
              {{ $vuetify.display.smAndUp ? "Neue Datei laden" : "" }}
            </v-btn>
            <v-btn icon="mdi-close" @click="isActive.value = false" />
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-0">
          <div v-show="showFileInput">
            <p>
              Hier können Sie einen Datensatz nach dem MII-Format laden.
              Basierend auf den Metadaten der Patient:innen und Kontakte können
              wir Verknüpfungen zu den ausgewählten Daten herstellen.
            </p>
            <div class="text-end py-2">
              <v-btn
                variant="text"
                size="small"
                color="primary"
                prepend-icon="mdi-download"
                @click="downloadSampleData()"
              >
                Synthetische Daten zum ausprobieren
              </v-btn>
            </div>
            <v-file-input
              v-model="file"
              variant="solo"
              flat
              bg-color="#EAEAF6"
              rounded="xl"
              label="MII-Daten auswählen"
              placeholder="Welche Datensätze suchen Sie?"
              hide-details
              clearable
              class="pb-4"
              @change="onFileSelected"
            />
          </div>
          <v-expand-transition>
            <div v-if="!!parsedData">
              <v-divider class="mb-2" />
              <p class="text-caption">
                <v-icon color="primary" class="mr-1">
                  mdi-check-circle-outline
                </v-icon>
                Datei erfolgreich gelesen! Es wurden
                <b>{{ parsedData.patients.length }} Patient:innen</b> und
                <b>{{ parsedData.encounters.length }} Kontakte</b> gefunden.
              </p>

              <v-row class="mb-4">
                <v-col cols="12" md="6">
                  <v-list>
                    <v-divider />
                    <UnifiedDataExportWeather
                      v-if="showUseCase('weather')"
                      :mii-data="parsedData"
                    />
                    <UnifiedDataExportReha
                      v-if="showUseCase('covid-rehabilitation')"
                      :mii-data="parsedData"
                    />
                  </v-list>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card
                    variant="outlined"
                    color="primary"
                    rounded="lg"
                    class="ma-2"
                    elevation="0"
                    height="100%"
                  >
                    <v-card-title>Vorschau {{ matchedDataName }}</v-card-title>
                    <v-card-text>
                      <v-data-table
                        v-if="matchedData && matchedData.data"
                        :items="matchedData.data.rows"
                        :headers="filteredHeaders"
                        :items-per-page="5"
                        items-per-page-text="pro Seite"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="primary"
                        variant="flat"
                        rounded="xl"
                        class="px-4"
                        prepend-icon="mdi-download"
                        @click="downloadMergedData()"
                      >
                        Daten download
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>

          <!--Callout-->
          <v-alert
            v-if="error"
            type="error"
            color="#DF4567"
            variant="tonal"
            rounded="lg"
            class="mb-4"
          >
            <template #title>
              {{ error }}
            </template>
            <div>
              <p>
                Die Anwendung kann leider nur Daten im FHIR Bundle Format
                verarbeiten. Stelle sicher, dass:
              </p>
              <ul class="pl-6">
                <li>Die Datei valides JSON (ohne Syntax-Fehler) ist</li>
                <li><code>"resourceType"</code> ist <code>"Bundle"</code></li>
                <li>
                  Die Datei hat eine <code>"entry"</code> Liste mit validen
                  <code>resource</code> Objekten.
                </li>
              </ul>
            </div>
          </v-alert>
          <v-alert
            v-model="showCallout"
            variant="outlined"
            color="primary"
            icon="mdi-information"
            elevation="0"
            rounded="lg"
            closable
          >
            <template #title>
              <span class="font-weight-bold">Hinweis</span>
            </template>
            <span>
              Die Daten werden nicht übertragen und werden nur lokal in Ihrem
              Browser verarbeitet. Wenn Sie die Seite neu laden, gehen die Daten
              verloren.
            </span>
          </v-alert>
          <v-alert
            v-model="showHint"
            color="#70ACC0"
            icon="mdi-lightbulb"
            elevation="0"
            rounded="lg"
            closable
            class="mt-2"
          >
            <template #title>
              <span class="font-weight-bold">
                Komplexere Analysen mit den Daten
              </span>
            </template>
            <span>
              In unserem
              <a
                href="https://github.com/technologiestiftung/post-covid-datenmodell"
                target="_blank"
                >GitHub Repository</a
              >
              finden Sie Python-Skripte um weitere Analysen durchzuführen.
            </span>
          </v-alert>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { parseMiiData } from "@/utils/miiParser";
import { type ParsedMiiData } from "@/types/mii";
import UnifiedDataExportWeather from "./UnifiedDataExportWeather.vue";
import UnifiedDataExportReha from "./UnifiedDataExportReha.vue";
import { useMatchedDataStore } from "@/stores/matching";
import metaData from "../data/2025-02-18_metadata.json";
import { type exportListItem } from "@/types/export";
import { useExportStore } from "@/stores/export";

const matchedDataStore = useMatchedDataStore();
const exportStore = useExportStore();

const showCallout = ref(true);
const showHint = ref(true);
const showFileInput = ref(true);

const showUseCase = (useCaseId: string) => {
  return exportStore.exportDatasets?.find((data) => data.id === useCaseId);
};

// get matched data from store
const matchedData = ref<exportListItem | undefined>(undefined);

const headers = computed(() => {
  return (
    matchedData.value?.data.headers.map((header) => {
      return {
        title: header,
        value: header,
      };
    }) || []
  );
});

interface TableHeader {
  title: string;
  value: string;
}

const filteredHeaders = computed(() => {
  if (matchedData.value?.export_fields.length === 0) {
    return headers.value;
  } else {
    const exportFieldsExtended =
      matchedData.value?.export_fields + "patient_id";
    return headers.value.filter((header: TableHeader) => {
      return exportFieldsExtended.includes(header.value);
    });
  }
});

// watch for changes to matched data
watch(
  () => matchedDataStore.currentMatch,
  (newVal) => {
    matchedData.value = newVal;
  }
);

const matchedDataName = computed(() => {
  if (!matchedDataStore?.currentMatch?.id) return "";
  const currentMatchId = matchedDataStore.currentMatch!.id;

  return metaData.find((item) => item.id == currentMatchId)?.title;
});

const file = ref<File | null>(null);

const parsedData = ref<ParsedMiiData | null>(null);

const downloadMergedData = () => {
  matchedDataStore.downloadMatch();
};

const resetFileInput = () => {
  showFileInput.value = true;
  parsedData.value = null;
  file.value = null;
  // reset
  matchedDataStore.clearMatchedData();
};

const error = ref<any | null>(null);

function onFileSelected() {
  if (!file.value) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    // reset error message
    error.value = null;
    try {
      const rawText = e.target?.result as string;
      const parsed = parseMiiData(rawText);

      parsedData.value = parsed;

      showFileInput.value = false;
    } catch (err) {
      error.value = err;
      console.error("Parsing error:", err);
    }
  };

  reader.readAsText(file.value);
}

const downloadSampleData = () => {
  // sample data is in the public folder
  const url = "/2024-12-02_mii_testdaten_small.json";

  // download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = "mii-data.json";
  a.click();
};
</script>

<style>
.v-table .v-table__wrapper > table > thead > tr > th {
  background-color: #e2eef2 !important;
}
</style>

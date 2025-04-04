<template>
  <v-card flat rounded="xl" class="pa-4 mb-4">
    <v-card-title>
      <v-row>
        <v-col cols="12" md="7" sm="12">
          <p style="white-space: normal; font-weight: 600">
            {{ dataEntry.title }}
          </p>
        </v-col>
        <v-col cols="12" md="5" class="d-flex align-top justify-end">
          <v-btn
            v-if="!exportView"
            icon
            :variant="isSelected ? 'flat' : 'outlined'"
            color="primary"
            size="38"
            @click="toggleSelected"
          >
            <v-icon size="24">
              {{ isSelected ? "mdi-star" : "mdi-star-outline" }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-2 pb-0 text-none"
            :prepend-icon="isExtended ? 'mdi-minus' : 'mdi-plus'"
            variant="flat"
            color="primary"
            rounded
            @click="isExtended = !isExtended"
          >
            {{ isExtended ? "weniger Infos" : "mehr Infos" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="py-4">
      <!-- description -->
      <p>{{ dataEntry.description }}</p>
      <br />

      <!-- Schlüsselattribute -->
      <div class="d-flex align-center mb-4">
        <b class="pr-4 text-secondary">Schlüsselattribute </b>
        <div>
          <v-chip
            v-for="chip in dataEntry.filter_attributes"
            :key="chip"
            color="primary"
            variant="outlined"
            class="mr-2"
            >{{ chip }}
          </v-chip>
        </div>
      </div>

      <!-- Available Attributes -->
      <v-row>
        <v-col cols="12" sm="6" v-if="dataEntry.availability_temporal">
          <b class="mr-4">Verfügbare Zeitspanne </b>
          {{ dataEntry.availability_temporal.start_date }} -
          {{ dataEntry.availability_temporal.end_date }}
        </v-col>
        <v-col cols="12" sm="6" v-if="dataEntry.availability_spatial">
          <b class="mr-4">Ort </b>
          {{ dataEntry.availability_spatial.country }}
        </v-col>
      </v-row>

      <!-- Quelle -->
      <p class="pt-4">
        <b class="pr-4 text-secondary">Quelle </b> {{ dataEntry.source }}
        <v-icon @click="showSource = !showSource">{{
          showSource ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </p>
      <br />

      <div v-if="showSource">
        <v-row>
          <v-col cols="12" sm="4">
            <b>Kontakt</b>
            <p v-html="dataEntry.contact.address"></p>
          </v-col>
          <v-col cols="12" sm="4">
            <b>Erreichbarkeit</b>
            <br />
            <v-icon>mdi-phone</v-icon>{{ dataEntry.contact.phone_number }}
            <br />
            <v-icon>mdi-email</v-icon>{{ dataEntry.contact.email }}
          </v-col>
          <v-col cols="12" sm="4">
            <b>Aktualisiert</b> <br />
            {{ dataEntry.last_updated }}
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <!-- More Information -->
    <div v-if="isExtended">
      <v-card-title class="text-secondary">Attribute im Datensatz</v-card-title>
      <v-card-text>
        <p style="color: #a1a1aa" class="pb-2">
          Konfigurieren Sie den Datensatz nach den für Sie relevanten Attribute
          vor dem Export, indem Sie per Klick an- oder abwählen.
        </p>
        <v-chip-group
          v-model="selectedAttributeFields"
          column
          multiple
          @update:model-value="
            exportStore.updateAttributeExportFields(
              dataEntry.id,
              selectedAttributeFields
            )
          "
        >
          <v-chip
            v-for="chip in dataEntry.attributes"
            :key="chip"
            :value="chip"
            variant="flat"
            base-color="#E2EEF2"
            class="text-primary"
            selected-class="text-secondary"
            color="#70ACC0"
            >{{ chip }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-title class="text-secondary">Dateiformate</v-card-title>
      <v-card-text>
        <p style="color: #a1a1aa" class="pb-2">
          Wählen Sie ein passendes Dateiformat vor dem Download aus per Klick
          an- oder abwählen.
        </p>
        <v-chip-group
          v-model="selectedDataFormat"
          column
          @update:model-value="
            exportStore.updateDataFormatExportField(
              dataEntry.id,
              selectedDataFormat
            )
          "
        >
          <v-chip
            v-for="chip in dataEntry.data_formats"
            :key="chip"
            :value="chip"
            variant="flat"
            base-color="#E2EEF2"
            class="text-primary"
            selected-class="text-secondary"
            color="#70ACC0"
          >
            {{ chip }}-Datei
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </div>
    <!-- Datenvorschau + Export -->
    <v-row justify="end">
      <v-col cols="12" sm="auto">
        <data-chart-dialog
          v-if="isInExportList && chartAvailable(dataEntry)"
          :dataEntry="dataEntry"
        ></data-chart-dialog>
      </v-col>
      <v-col cols="12" sm="auto">
        <data-preview-dialog
          v-if="isInExportList"
          :dataEntry="dataEntry"
        ></data-preview-dialog>
      </v-col>

      <v-col cols="12" sm="auto">
        <!-- two buttons to make the destinction clearer -->
        <v-btn
          v-if="isInExportList"
          class="text-none"
          rounded="xl"
          color="primary"
          variant="flat"
          append-icon="mdi-minus"
          block
          @click="exportStore.removeFromExport(dataEntry.id)"
        >
          Vom Export entfernen
        </v-btn>
        <v-btn
          v-else
          class="text-none"
          rounded="xl"
          color="primary"
          variant="flat"
          append-icon="mdi-arrow-right"
          block
          @click="exportStore.addToExport(dataEntry.id)"
        >
          Zum Export hinzufügen
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="auto">
        <v-overlay
          :model-value="loading"
          class="align-center justify-center"
          persistent
        >
          <v-progress-circular color="primary" indeterminate size="100" />
        </v-overlay>
      </v-col>
    </v-row>

    <!-- todo: option for better distribution of buttons when small screen -->
    <!-- <v-card-actions v-if="smAndDown">
      <v-row>
        <v-col cols="12" md="5" class="d-flex align-top justify-end">
          <v-btn
            icon
            variant="outlined"
            color="primary"
            size="x-small"
            @click="isSelected = !isSelected"
          >
            <v-icon>
              {{ isSelected ? "mdi-star-outline" : "mdi-star" }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            :prepend-icon="isExtended ? 'mdi-minus' : 'mdi-plus'"
            variant="flat"
            color="primary"
            rounded
            @click="isExtended = !isExtended"
          >
            {{ isExtended ? "weniger Infos" : "mehr Infos" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions> -->
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { type MetaDataEntry } from "../types/metadata";
import { useExportStore } from "@/stores/export";
import { useFilterStore } from "@/stores/filters";
import { DataFormat } from "@/types/metadata";
import DataPreviewDialog from "./DataPreviewDialog.vue";
import DataChartDialog from "./DataChartDialog.vue";

const props = defineProps<{
  dataEntry: MetaDataEntry;
  exportView: boolean | undefined;
}>();

const selectedAttributeFields = ref<string[]>([]);
const selectedDataFormat = ref<DataFormat>();

const exportStore = useExportStore();
const isInExportList = computed(() => {
  return exportStore.exportDatasets.some(
    (dataset) => dataset.id === props.dataEntry.id
  );
});

// todo: add to store?
const isSelected = ref(false);
const isExtended = ref(props.exportView ? true : false);
const showSource = ref(false);

const loading = computed(() => exportStore.isLoading);

// function to check if chart is available from a list of datasets with chart data

const chartAvailable = (dataEntry: MetaDataEntry) => {
  const availableCharts = [
    "weather",
    "air-quality",
    "covid-cases",
    "sewage-water",
  ];

  return availableCharts.includes(dataEntry.id);
};
// implement favorite button
const filterStore = useFilterStore();
const toggleSelected = () => {
  isSelected.value = !isSelected.value;
  if (isSelected.value) {
    filterStore.favorites.push(props.dataEntry.id);
  } else {
    filterStore.favorites = filterStore.favorites.filter(
      (id) => id !== props.dataEntry.id
    );
  }
};
</script>

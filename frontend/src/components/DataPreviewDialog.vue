<template>
  <v-dialog :fullscreen="isExtended" max-height="1000px" max-width="1000px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="isInExportList"
        class="text-none"
        prepend-icon="mdi-folder-eye"
        rounded="xl"
        color="primary"
        variant="outlined"
        block
        v-bind="activatorProps"
      >
        Datenvorschau
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl">
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-secondary font-weight-bold">{{
            dataEntry.title
          }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
            <v-btn
              :icon="!isExtended ? 'mdi-arrow-expand' : 'mdi-arrow-collapse'"
              @click="isExtended = !isExtended"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card
            rounded="lg"
            variant="outlined"
            style="border-color: #a1a1aa; border-width: 0.01em"
          >
            <v-data-table
              :items="rows"
              :headers="filteredHeaders"
              :items-per-page="5"
              itemsPerPageText="pro Seite"
              :items-per-page-options="[5, 10]"
              page-text="{0}-{1} von {2}"
            ></v-data-table>
          </v-card>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { type MetaDataEntry } from "../types/metadata";
import { useExportStore } from "@/stores/export";
import { DataFormat } from "@/types/metadata";

const props = defineProps<{
  dataEntry: MetaDataEntry;
}>();

const selectedAttributeFields = ref<string[]>([]);
const selectedDataFormat = ref<DataFormat>();

const exportStore = useExportStore();
const isInExportList = computed(() => {
  return exportStore.exportDatasets.some(
    (dataset) => dataset.id === props.dataEntry.id
  );
});

const data = computed(() => {
  return isInExportList.value
    ? exportStore.exportDatasets.find(
        (dataset) => dataset.id === props.dataEntry.id
      )?.data
    : {
        headers: [],
        rows: [],
      };
});

const exportDataset = computed(() => {
  return exportStore.exportDatasets.find(
    (dataset) => dataset.id === props.dataEntry.id
  );
});

const rows = computed(() => {
  return exportDataset.value?.data.rows || [];
});

const headers = computed(() => {
  return (
    exportDataset.value?.data.headers.map((header) => {
      return {
        title: header,
        value: header,
      };
    }) || []
  );
});

const filteredHeaders = computed(() => {
  if (exportDataset.value?.export_fields.length === 0) {
    return headers.value;
  } else {
    return headers.value.filter((header) => {
      return exportDataset.value?.export_fields.includes(header.value);
    });
  }
});

// todo: add to store?
const isSelected = ref(false);
const isExtended = ref(false);
const showSource = ref(false);
</script>

<style>
.v-table .v-table__wrapper > table > thead > tr > th {
  background-color: #e2eef2 !important;
}
</style>

<template>
  <v-card flat rounded="xl" class="mb-4">
    <v-card-title> Datensatzauswahl </v-card-title>

    <v-list>
      <v-list-item v-for="item in exportStore.exportDatasets" :key="item.id">
        <v-list-item-title class="d-flex">
          {{ item.id }} <v-spacer></v-spacer>
          <v-icon @click="exportStore.removeFromExport(item.id)">
            mdi-trash-can-outline
          </v-icon>
        </v-list-item-title>
        <v-list-item-subtitle
          ><v-chip color="#70acc0" variant="flat">{{ item.format }}</v-chip>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-btn
      color="primary"
      block
      class="text-white py-3"
      append-icon="mdi-download"
      @click="exportStore.downloadData"
    >
      Daten Download
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useExportStore } from "../stores/export";

const exportStore = useExportStore();
</script>

<template>
  <v-card flat rounded="xl" class="mb-4">
    <v-card-title class="mt-4 ml-2" style="font-weight: 600">
      Datensatzauswahl
    </v-card-title>
    <div class="px-2 pb-4">
      <v-list>
        <v-list-item v-for="item in exportStore.exportDatasets" :key="item.id">
          <v-list-item-title style="font-weight: 600">
            <v-icon size="20" class="mr-1">mdi-checkbox-outline</v-icon
            >{{ item.id }}
          </v-list-item-title>
          <template #append>
            <v-icon
              @click="exportStore.removeFromExport(item.id)"
              color="#c2c7d1"
            >
              mdi-trash-can
            </v-icon>
          </template>
          <v-list-item-subtitle style="opacity: 1"
            ><v-chip
              density="compact"
              class="mt-2 ml-6 text-secondary"
              variant="flat"
              color="#70ACC0"
              >{{ item.format }}-Datei</v-chip
            >
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </div>

    <v-btn
      color="primary"
      block
      class="text-white py-3 text-none"
      append-icon="mdi-download"
      @click="exportStore.downloadData"
      tile
      size="large"
    >
      Auswahl exportieren
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useExportStore } from "../stores/export";

const exportStore = useExportStore();
</script>

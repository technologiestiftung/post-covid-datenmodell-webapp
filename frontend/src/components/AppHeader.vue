<template>
  <v-app-bar :elevation="0">
    <v-container>
      <div class="d-flex align-center justify-space-between pt-3 pb-2">
        <div class="ml-2">
          <img src="../assets/header-logo.svg" height="60px" width="60px" />
        </div>
        <div class="d-flex flex-wrap gap-2 align-center">
          <v-btn
            :to="{
              name: 'DataList',
            }"
            variant="flat"
            size="small"
            class="text-primary text-capitalize"
          >
            Metadatenbank
          </v-btn>
          <v-btn
            variant="flat"
            size="small"
            class="text-primary text-capitalize"
          >
            Daten vorschlagen
          </v-btn>
          <v-btn
            :to="{
              name: 'DataExport',
            }"
            variant="outlined"
            rounded="xl"
            size="small"
            class="text-primary text-capitalize"
          >
            Datensatz-Export
            <v-badge
              v-if="exportCount > 0"
              :content="exportCount"
              color="primary"
              inline
            />
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useExportStore } from "@/stores/export";

const exportStore = useExportStore();
const exportCount = computed(() => exportStore.exportDatasets.length);
</script>

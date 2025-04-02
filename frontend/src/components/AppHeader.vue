<template>
  <v-navigation-drawer
    v-model="drawer"
    disable-resize-watcher
    location="left"
    temporary
  >
    <v-list nav>
      <v-list-item :to="{ name: 'Home' }" prepend-icon="mdi-home">
        <v-list-item-title>Startseite</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'DataList' }" prepend-icon="mdi-database">
        <v-list-item-title>Metadatenbank</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'DataSuggestion' }" prepend-icon="mdi-plus">
        <v-list-item-title>Daten vorschlagen</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'DataExport' }" prepend-icon="mdi-download">
        <v-list-item-title
          >Datensatz-Export
          <v-badge
            v-if="exportCount > 0"
            :content="exportCount"
            color="primary"
            inline
        /></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="0" class="px-4">
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />
      <router-link
        :to="{
          name: 'Home',
        }"
      >
        <v-img src="../assets/header-logo.svg" height="60px" width="60px" />
      </router-link>
    </template>
    <template v-if="$vuetify.display.mdAndUp">
      <v-tabs>
        <v-tab
          :to="{
            name: 'DataList',
          }"
          class="text-primary text-capitalize"
        >
          Metadatenbank
        </v-tab>
        <v-tab
          :to="{
            name: 'DataSuggestion',
          }"
          class="text-primary text-capitalize"
        >
          Beitragen
        </v-tab>
        <v-tab
          :to="{
            name: 'FAQ',
          }"
          class="text-primary text-capitalize"
        >
          FAQ
        </v-tab>
      </v-tabs>
      <v-btn
        :to="{
          name: 'DataExport',
        }"
        variant="outlined"
        rounded="xl"
        class="text-primary text-capitalize ml-4 py-2 px-4"
      >
        Datensatz-Export
        <v-badge
          v-if="exportCount > 0"
          :content="exportCount"
          color="primary"
          inline
        />
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useExportStore } from "@/stores/export";

const exportStore = useExportStore();
const exportCount = computed(() => exportStore.exportDatasets.length);

const drawer = ref(false);
</script>

<style>
.v-tab__slider {
  left: auto !important;
  top: 0;
  height: 4px !important;
}
</style>

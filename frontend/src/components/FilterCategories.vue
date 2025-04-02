<template>
  <div>
    <v-chip-group
      v-model="filterStore.filterCategory"
      column
      @update:model-value="(value) => updateFilterCategory(value as Category)"
    >
      <v-chip
        v-for="category in [
          'Umwelt',
          'Gesellschaft',
          'Gesundheit',
          'Demografie',
        ]"
        :key="category"
        :value="category"
        class="px-4 py-2"
        :variant="filterStore.filterCategory === category ? 'flat' : 'outlined'"
        color="secondary"
        size="large"
      >
        {{ category }}
      </v-chip>
    </v-chip-group>
    <v-chip
      class="font-italic mt-2 px-4 py-2"
      v-if="filterStore.search"
      closable
      @click:close="filterStore.search = ''"
      >Suchwort: {{ filterStore.search }}</v-chip
    >
  </div>
</template>
<script setup lang="ts">
import { useFilterStore } from "../stores/filters";
import { Category } from "../types/metadata";

const filterStore = useFilterStore();

const updateFilterCategory = (value: Category) => {
  filterStore.filterCategory = value;
  filterStore.search = "";
};
</script>

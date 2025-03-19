<template>
  <div>
    <v-chip-group
      v-model="filterStore.filterCategory"
      column
      @update:model-value="(value) => (filterStore.filterCategory = value as Category)"
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
        :variant="filterStore.filterCategory === category ? 'flat' : 'outlined'"
        color="secondary"
      >
        {{ category }}
      </v-chip>
    </v-chip-group>
  </div>
</template>
<script setup lang="ts">
import { useFilterStore } from "../stores/filters";
import { Category } from "../types/metadata";

const filterStore = useFilterStore();
</script>

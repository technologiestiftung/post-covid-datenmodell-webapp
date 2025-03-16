<template>
  <div class="mt-2">
    <!-- todo: write selection to filter store (multi-select) -->
    <!--
    <v-chip-group column v-model="filterStore.filterParams" multiple>
      <v-chip
        prepend-icon="mdi-calendar-blank-outline"
        variant="outlined"
        color="secondary"
        value="Zeitspanne"
        >Zeitspanne
      </v-chip>
      <v-chip
        prepend-icon="mdi-map-marker-outline"
        variant="outlined"
        color="secondary"
        value="Ort"
        >Ort
      </v-chip>
      <v-chip
        prepend-icon="mdi-shape-circle-plus"
        variant="outlined"
        color="secondary"
        value="Alter"
        >Alter
      </v-chip>
      <v-chip
        prepend-icon="mdi-gender-male-female"
        variant="outlined"
        color="secondary"
        value="Geschlecht"
        >Geschlecht
      </v-chip>
    </v-chip-group>
  </div>
  -->
    <FilterDateSpan></FilterDateSpan>
    <FilterLocation></FilterLocation>
    <FilterAgeGroup></FilterAgeGroup>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useFilterStore } from "../stores/filters";

import FilterLocation from "./FilterLocation.vue";
import FilterDateSpan from "./FilterDateSpan.vue";
import FilterAgeGroup from "./FilterAgeGroup.vue";

const filterStore = useFilterStore();
</script>

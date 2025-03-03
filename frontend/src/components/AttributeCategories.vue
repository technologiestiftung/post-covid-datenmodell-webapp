<template>
  <div>
    <!-- todo: write selection to filter store (multi-select) -->
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
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useFilterStore } from "../stores/filters";

const filterStore = useFilterStore();
</script>

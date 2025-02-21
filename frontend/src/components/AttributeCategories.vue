<template>
  <div>
    <!-- todo: write selection to filter store (multi-select) -->
    <v-chip-group column>
      <v-chip
        prepend-icon="mdi-calendar-blank-outline"
        variant="outlined"
        color="secondary"
        >Zeitspanne
      </v-chip>
      <v-chip
        prepend-icon="mdi-map-marker-outline"
        variant="outlined"
        color="secondary"
        >Ort
      </v-chip>
      <v-chip
        prepend-icon="mdi-shape-circle-plus"
        variant="outlined"
        color="secondary"
        >Alter
      </v-chip>
      <v-chip
        prepend-icon="mdi-gender-male-female"
        variant="outlined"
        color="secondary"
        >Geschlecht
      </v-chip>
    </v-chip-group>
  </div>
</template>
<script setup lang="ts"></script>

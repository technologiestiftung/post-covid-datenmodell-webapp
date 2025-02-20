<template>
  <div>
    <!-- todo: write selection to filter store (multi-select) -->
    <v-chip-group column>
      <v-chip prepend-icon="mdi-calendar-blank-outline" variant="flat"
        >Zeitspanne
      </v-chip>
      <v-chip prepend-icon="mdi-map-marker-outline" variant="flat">Ort </v-chip>
      <v-chip variant="flat">Alter </v-chip>
      <v-chip prepend-icon="mdi-gender-male-female" variant="flat"
        >Geschlecht
      </v-chip>
    </v-chip-group>
  </div>
</template>
<script setup lang="ts"></script>

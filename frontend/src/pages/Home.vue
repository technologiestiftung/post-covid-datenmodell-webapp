<template>
  <v-card elevation="2">
    <v-card-title>Hello fellow developers!</v-card-title>
    <v-card-text>
      We tested out the store. Here are some variables:
      {{ dataStore.testVariable + " " + dataStore.anotherTestVariable }}
      We use our colors down below for the buttons
    </v-card-text>

    <v-card-actions>
      <v-btn variant="flat" color="primary">Hello</v-btn>
      <v-btn color="tbsDarkBlue">Hello</v-btn>
      <v-btn color="tbsLightBlue"> Hello</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useDataStore } from "../stores/data";

const dataStore = useDataStore();
</script>

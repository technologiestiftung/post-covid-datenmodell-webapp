<template>
  <v-dialog
    max-width="800px"
    @close="data.isWelcomeDialogOpen = false"
    v-model="data.isWelcomeDialogOpen"
  >
    <v-card rounded="lg">
      <v-toolbar color="transparent">
        <v-toolbar-title class="ml-4 mt-1">
          <v-img src="../assets/header-logo.svg" height="60px" width="60px" />
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            @click="data.isWelcomeDialogOpen = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <h1 class="text-h5 text-md-h4 text-secondary" style="font-weight: 600">
          Post-COVID-Datenmodell
        </h1>
        <p class="mt-4">
          Das Post-COVID-Datenmodell ist ein Projekt der Technologiestifung
          Berlin und dem Berlin Institute of Health at Charité Berlin, das mit
          Unterstützung von &effect data solutions GmbH umgesetzt wurde.
        </p>
        <p class="mt-2">
          <b class="text-secondary">Hinweis: Prototyp in der Entwicklung</b>
          <br />
          Diese Anwendung wurde im Rahmen einer Ausschreibung des
          Bundesministeriums für Inneres und Heimat und dem Bundesministerium
          für Wirtschaft und Klimaschutz entwickelt und dient als technisches
          Konzept. Sie ist nicht als vollständig ausgereiftes Produkt gedacht,
          daher können einzelne Funktionen eingeschränkt sein oder nicht immer
          fehlerfrei funktionieren.
        </p>
        <p class="mt-2">Vielen Dank fürs Ausprobieren!</p>
      </v-card-text>
      <div class="d-flex pa-4 mb-8 flex-column flex-md-row">
        <v-img src="../assets/tsb.svg" height="40px" class="my-4 my-md-2" />
        <v-img src="../assets/BIH.svg" height="40px" class="my-4 my-md-2" />
        <v-img
          src="../assets/and-effect.svg"
          height="40px"
          class="my-4 my-md-2"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDataStore } from "@/stores/data";

const data = useDataStore();
</script>

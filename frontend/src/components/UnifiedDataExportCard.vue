<template>
  <v-card variant="tonal" color="primary" rounded="xl" flat>
    <v-card-title style="white-space: nowrap"
      ><v-icon class="mr-2">mdi-creation</v-icon
      ><span style="word-break: normal; white-space: normal"
        >Export mit MII-Daten verknüpfen</span
      ></v-card-title
    >
    <v-card-text>
      Hier können Sie die ausgewählten Datensätze mit Ihren MII-Daten
      verknüpfen.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <UnifiedDataExportDialog></UnifiedDataExportDialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import UnifiedDataExportDialog from "./UnifiedDataExportDialog.vue";
</script>

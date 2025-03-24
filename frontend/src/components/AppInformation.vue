<template>
  <span>
    <v-tooltip location="bottom" max-width="300px">
      <template #activator="{ props }">
        <v-icon color="secondary" class="ml-1" v-bind="props">
          mdi-information
        </v-icon>
      </template>
      <span>{{ metricDescriptions[metric] }}</span>
    </v-tooltip>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  metric: string;
}>();

type MetricDescriptions = {
  [key: string]: string;
};

const metricDescriptions = ref<MetricDescriptions>({
  metadatenkatalog:
    "In unserem Metadatenkatalog finden Sie alle Datensätze die derzeit verfügbar sind. Wenn Ihnen ein Datensatz fehlt, können Sie uns gerne kontaktieren.",
  contactForm:
    "Füllen Sie das Formular aus, um uns einen Datensatz vorzuschlagen. Verpflichtende Felder sind mit einem Stern (*) gekennzeichnet.",
  export:
    "Hier können Sie die ausgewählten Datensätze exportieren. Wählen Sie dazu die gewünschten Datensätze aus, welche Attribute exportiert werden sollen (optional) und klicken Sie auf den Export-Button. Alternativ können Sie auch den Verknüpften Export wählen bei welchem Sie die Daten mit Ihrem MII-Datensatz verknüpfen können.",
});
</script>

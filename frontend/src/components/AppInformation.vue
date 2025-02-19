<template>
  <span>
    <v-tooltip location="bottom" max-width="300px">
      <template #activator="{ props }">
        <v-icon color="tbsDarkBlue" class="ml-1" v-bind="props">
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
  metadatenkatalog: "Lorem ipsum text.",
});
</script>

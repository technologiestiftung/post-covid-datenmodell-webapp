<template>
  <div class="mt-2">
    <FilterDateSpan></FilterDateSpan>
    <FilterLocation></FilterLocation>
    <FilterAgeGroup></FilterAgeGroup>
    <MagicFilterDialog></MagicFilterDialog>
  </div>
</template>
<script setup lang="ts">
import FilterLocation from "./FilterLocation.vue";
import FilterDateSpan from "./FilterDateSpan.vue";
import FilterAgeGroup from "./FilterAgeGroup.vue";
import MagicFilterDialog from "./MagicFilterDialog.vue";
</script>

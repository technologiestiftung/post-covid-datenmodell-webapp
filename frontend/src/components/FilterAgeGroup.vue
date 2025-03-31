<template>
  <v-dialog max-width="800px" min-height="200px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip
        prepend-icon="mdi-shape-circle-plus"
        variant="outlined"
        color="secondary"
        class="pr-1 my-1 mr-2"
        v-bind="activatorProps"
      >
        Alter
        <v-chip density="compact" color="primary" class="ml-2 mr-0">
          <span
            v-html="
              $vuetify.display.mdAndUp
                ? formattedFilterLabel
                : formattedFilterLabelShort
            "
          ></span>
        </v-chip>
      </v-chip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl" style="background-color: #eaeaf6">
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-secondary font-weight-bold">
            Altersgruppen-Filter
          </v-toolbar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <p class="text-secondary text-subtitle-2 pt-2">
            Welche Altersgruppen möchten Sie auswählen?
          </p>
          <v-chip-group
            v-model="ageGroupsSelected"
            column
            multiple
            filter
            mandatory
          >
            <v-chip
              v-for="ageGroup in ageGroups"
              :key="ageGroup"
              :value="ageGroup"
              variant="outlined"
              color="primary"
              filter
            >
              {{ ageGroup == "00+" ? "alle" : ageGroup }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useFilterStore } from "../stores/filters";

const filterStore = useFilterStore();

const ageGroupsSelected = ref<string[]>(
  filterStore.filterParams.age || ["00+"]
);

const ageGroups = ["00+", "00-04", "05-14", "15-34", "35-59", "60-79", "80+"];

const formattedFilterLabel = computed(() => {
  if (ageGroupsSelected.value[0] === "00+") return "Alle";

  return (
    ageGroupsSelected.value.sort().slice(0, 2).join(", ") +
    (ageGroupsSelected.value.length > 2
      ? "<i> und " + (ageGroupsSelected.value.length - 2) + " weitere... </i>"
      : "")
  );
});

const formattedFilterLabelShort = computed(() => {
  if (ageGroupsSelected.value[0] === "00+") return "Alle";

  return ageGroupsSelected.value.length + " Altersgruppen";
});

watch(ageGroupsSelected, (newValue) => {
  filterStore.age = newValue;
});

watch(
  () => filterStore.age,
  (newVal) => {
    if (!newVal) return;
    ageGroupsSelected.value = newVal;
  }
);
</script>

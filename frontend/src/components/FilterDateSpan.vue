<template>
  <v-dialog max-width="800px" min-height="400px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip
        prepend-icon="mdi-calendar-blank-outline"
        variant="outlined"
        color="secondary"
        class="pr-1 mr-2 my-1"
        v-bind="activatorProps"
      >
        Zeitspanne
        <v-chip density="compact" color="primary" class="ml-2 mr-0">
          {{ dateStartFormatted }} - {{ dateEndFormatted }}
        </v-chip>
      </v-chip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl" style="background-color: #eaeaf6">
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-secondary font-weight-bold">
            Zeitspanne-Filter
          </v-toolbar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-secondary text-subtitle-2">
                Wählen Sie das Startdatum
              </p>
              <v-locale-provider locale="de">
                <v-date-picker
                  v-model="startDateSelected"
                  hide-header
                  bg-color="white"
                  rounded="xl"
                  min="2020-01-01"
                  :max="today"
                  locale="de"
                />
              </v-locale-provider>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-secondary text-subtitle-2">
                Wählen Sie das Enddatum
              </p>
              <v-locale-provider locale="de">
                <v-date-picker
                  v-model="endDateSelected"
                  hide-header
                  bg-color="white"
                  rounded="xl"
                  min="2020-01-01"
                  :max="today"
                  locale="de"
                />
              </v-locale-provider>
            </v-col>
          </v-row>
          <p class="pt-2 text-caption">
            Hinweis: Sie können nur eine Spanne von max. einem Jahr auswählen.
          </p>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useFilterStore } from "../stores/filters";

const filterStore = useFilterStore();

// Utility to add or subtract years from a date
function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}

// Today's date is the latest selectable end date
const today = new Date();

// State for start and end dates
const endDateSelected = ref<Date>(
  filterStore.filterParams.startDate
    ? new Date(filterStore.filterParams.startDate)
    : today
);

watch(
  () => filterStore.startDate,
  (newVal) => {
    if (!newVal) return;
    startDateSelected.value = new Date(newVal);
  }
);

watch(
  () => filterStore.endDate,
  (newVal) => {
    if (!newVal) return;
    endDateSelected.value = new Date(newVal);
  }
);

const startDateSelected = ref<Date>(
  filterStore.filterParams.endDate
    ? new Date(filterStore.filterParams.endDate)
    : addYears(today, -1)
); // one year before today by default

// Formatted date strings for display
const dateStartFormatted = computed(() =>
  startDateSelected.value.toLocaleDateString("de-DE", {
    month: "short",
    year: "numeric",
  })
);

const dateEndFormatted = computed(() =>
  endDateSelected.value.toLocaleDateString("de-DE", {
    month: "short",
    year: "numeric",
  })
);

// Watch the end date and adjust the start date if needed
watch(endDateSelected, (newVal) => {
  if (!newVal) return;

  const oneYearBefore = addYears(newVal, -1);

  // If start date is too far back, adjust it to one year before end date
  if (startDateSelected.value < oneYearBefore) {
    startDateSelected.value = oneYearBefore;
  }

  // If start date is after end date, sync it with end date
  if (startDateSelected.value > newVal) {
    startDateSelected.value = new Date(newVal);
  }

  // set it in the store
  filterStore.startDate = startDateSelected.value.toDateString();
  filterStore.endDate = endDateSelected.value.toDateString();
});

// Watch the start date and adjust the end date if needed
watch(startDateSelected, (newVal) => {
  if (!newVal) return;

  const oneYearAfter = addYears(newVal, 1);

  // If end date is too far forward, adjust it to one year after start date
  if (endDateSelected.value > oneYearAfter) {
    endDateSelected.value = oneYearAfter;
  }

  // If end date is before start date, sync it with start date
  if (endDateSelected.value < newVal) {
    endDateSelected.value = new Date(newVal);
  }

  // set it in the store
  filterStore.startDate = startDateSelected.value.toDateString();
  filterStore.endDate = endDateSelected.value.toDateString();
});
</script>

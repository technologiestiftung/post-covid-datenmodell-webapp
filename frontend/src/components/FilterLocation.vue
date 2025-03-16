<template>
  <v-dialog max-width="800px" min-height="400px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip
        prepend-icon="mdi-map-marker-outline"
        variant="outlined"
        color="secondary"
        class="pr-1 mr-2 my-1"
        v-bind="activatorProps"
        >Ort
        <v-chip density="compact" color="primary" class="ml-2 mr-0">
          {{
            level === LocationLevel.states
              ? "BL: "
              : level === LocationLevel.districts
              ? "LK: "
              : "Bundesweit"
          }}
          {{
            level === LocationLevel.states
              ? statesSelected.sort().join(", ")
              : ""
          }}
          {{
            level === LocationLevel.districts
              ? districtsSelected.sort().join(", ")
              : ""
          }}</v-chip
        >
      </v-chip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl" style="background-color: #eaeaf6">
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-secondary font-weight-bold">
            Ort-Filter
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <p class="text-secondary text-subtitle-2">
            Auf welcher Ebene möchten Sie die Daten filtern?
          </p>
          <v-chip-group v-model="level" mandatory>
            <v-chip
              variant="outlined"
              color="primary"
              :value="LocationLevel.germany"
            >
              Bundesweit
            </v-chip>
            <v-chip
              variant="outlined"
              color="primary"
              :value="LocationLevel.states"
            >
              Bundesland
            </v-chip>
            <v-chip
              variant="outlined"
              color="primary"
              :value="LocationLevel.districts"
            >
              Landkreis
            </v-chip>
          </v-chip-group>

          <v-expand-transition>
            <div class="pt-2" v-if="level === LocationLevel.states">
              <p class="text-secondary text-subtitle-2 pt-2">
                Welche Bundesländer möchten Sie filtern?
              </p>
              <v-chip-group column multiple filter v-model="statesSelected">
                <v-chip
                  v-for="state in states"
                  :key="state"
                  :value="state"
                  variant="outlined"
                  color="primary"
                  filter
                  >{{ state }}
                </v-chip>
              </v-chip-group>
            </div>
            <div class="pt-2" v-if="level === LocationLevel.districts">
              <p class="text-secondary text-subtitle-2 pt-2">
                Welche Landkreise möchten Sie filtern? (max. 5)
              </p>
              <v-combobox
                v-model="districtsSelected"
                :items="districts"
                label="Landkreis"
                outlined
                dense
                multiple
                variant="outlined"
                chips
                clearable
                class="pt-2"
                hint="Maximal 5 Landkreise"
                rounded="xl"
              ></v-combobox>
            </div>
          </v-expand-transition>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useFilterStore } from "../stores/filters";
import { useDataStore } from "@/stores/data";
import { LocationLevel } from "../types/metadata";

const filterStore = useFilterStore();
const dataStore = useDataStore();

const level = ref<LocationLevel>(
  filterStore.filterParams.locationStates.length > 0
    ? LocationLevel.states
    : filterStore.filterParams.locationDistricts.length > 0
    ? LocationLevel.districts
    : LocationLevel.germany
);

const districtsSelected = ref<string[]>(
  filterStore.filterParams.locationDistricts
);
const statesSelected = ref<string[]>(filterStore.filterParams.locationStates);

const states = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
];

// deduplicated district names from kreisData
const districts = computed(() => {
  return Array.from(
    new Set(
      dataStore.kreisData
        .map((d) => d.name)
        .filter((d) => d !== null)
        .sort()
    )
  );
});

console.log(districts);
//
// ✅ Watchers to sync selection with the store
//

// Watch the level selection
watch(level, (newLevel) => {
  if (newLevel === LocationLevel.germany) {
    statesSelected.value = [];
    districtsSelected.value = [];

    // Update store (both empty)
    filterStore.filterParams = {
      ...filterStore.filterParams,
      locationStates: [],
      locationDistricts: [],
    };
  }
});

// Watch the states selection
watch(statesSelected, (newStates) => {
  if (newStates.length > 0) {
    districtsSelected.value = [];
    // Update store: set states, clear districts
    filterStore.filterParams = {
      ...filterStore.filterParams,
      locationStates: [...newStates],
      locationDistricts: [],
    };
  } else if (level.value === LocationLevel.states) {
    // No selection → also update store accordingly
    filterStore.filterParams = {
      ...filterStore.filterParams,
      locationStates: [],
    };
  }
});

// Watch the districts selection
watch(districtsSelected, (newDistricts) => {
  if (newDistricts.length > 0) {
    statesSelected.value = [];

    // Update store: set districts, clear states
    filterStore.filterParams = {
      ...filterStore.filterParams,
      locationDistricts: [...newDistricts],
      locationStates: [],
    };
  } else if (level.value === LocationLevel.districts) {
    // No selection → also update store accordingly
    filterStore.filterParams = {
      ...filterStore.filterParams,
      locationDistricts: [],
    };
  }
});
</script>

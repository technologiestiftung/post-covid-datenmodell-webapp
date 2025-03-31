<template>
  <v-dialog max-width="800px" min-height="400px" :persistent="isDialogDisabled">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip
        prepend-icon="mdi-map-marker-outline"
        variant="outlined"
        color="secondary"
        class="pr-1 mr-2 my-1"
        v-bind="activatorProps"
      >
        Ort
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
            Ort-Filter
          </v-toolbar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-btn
              icon="mdi-close"
              :disabled="isDialogDisabled"
              @click="isActive.value = false"
            />
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
            <div v-if="level === LocationLevel.states" class="pt-2">
              <p class="text-secondary text-subtitle-2 pt-2">
                Welche Bundesländer möchten Sie filtern?
              </p>
              <v-chip-group
                v-model="statesSelected"
                column
                multiple
                filter
                @update:model-value="updateStates()"
              >
                <v-chip
                  v-for="state in states"
                  :key="state"
                  :value="state"
                  variant="outlined"
                  color="primary"
                  filter
                >
                  {{ state }}
                </v-chip>
              </v-chip-group>
            </div>
            <div v-if="level === LocationLevel.districts" class="pt-2">
              <p class="text-secondary text-subtitle-2 pt-2">
                Welche Landkreise möchten Sie filtern? (max. 10)
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
                hint="Maximal 10 Landkreise"
                :rules="maxDistrictRules"
                validate-on="eager"
                rounded="xl"
                @update:model-value="updateDistricts()"
              />
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

const maxDistrictRules = [
  (v: string[]) => {
    if (v.length > 10) {
      return "Maximal 10 Landkreise auswählen.";
    }
    return true;
  },
];

const level = ref<LocationLevel>(
  filterStore.filterParams.locationStates?.length > 0
    ? LocationLevel.states
    : filterStore.filterParams.locationDistricts?.length > 0
    ? LocationLevel.districts
    : LocationLevel.germany
);

const districtsSelected = ref<string[]>(
  filterStore.filterParams.locationDistricts
);

const isDialogDisabled = computed(() => {
  if (
    level.value === LocationLevel.districts &&
    districtsSelected.value.length > 10
  ) {
    return true;
  }
  return false;
});

const statesSelected = ref<string[]>(filterStore.filterParams.locationStates);

const formattedFilterLabel = computed(() => {
  if (level.value === LocationLevel.germany) return "Bundesweit";

  if (level.value === LocationLevel.states) {
    return (
      statesSelected.value.slice(0, 1).join(", ") +
      (statesSelected.value.length > 1
        ? "<i> und " + (statesSelected.value.length - 1) + " weitere... </i>"
        : "")
    );
  }

  if (level.value === LocationLevel.districts) {
    return (
      districtsSelected.value.slice(0, 1).join(", ") +
      (districtsSelected.value.length > 1
        ? "<i> und " + (districtsSelected.value.length - 1) + " weitere... </i>"
        : "")
    );
  }
});

const formattedFilterLabelShort = computed(() => {
  if (level.value === LocationLevel.germany) return "Bundesweit";

  if (level.value === LocationLevel.states) {
    return statesSelected.value.length + " Bundesländer";
  }

  if (level.value === LocationLevel.districts) {
    return districtsSelected.value.length + " Kreise";
  }
});

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

watch(
  () => level.value,
  (newVal) => {
    if (!newVal) return;
    if (newVal === LocationLevel.germany) {
      statesSelected.value = [];
      districtsSelected.value = [];
      filterStore.locationStates = [];
      filterStore.locationDistricts = [];
    }

    if (newVal === LocationLevel.states) {
      districtsSelected.value = [];
      filterStore.locationDistricts = [];
    }

    if (newVal === LocationLevel.districts) {
      statesSelected.value = [];
      filterStore.locationStates = [];
    }
  }
);

const updateStates = () => {
  if (statesSelected.value.length === 0) {
    filterStore.locationStates = [];
  }
  filterStore.locationStates = statesSelected.value;
  filterStore.locationDistricts = [];
};

const updateDistricts = () => {
  if (districtsSelected.value.length > 10) {
    // no save to filterstore
    return;
  }
  if (districtsSelected.value.length === 0) {
    filterStore.locationDistricts = [];
  }
  filterStore.locationDistricts = districtsSelected.value;
  filterStore.locationStates = [];
};

watch(
  () => filterStore.locationStates,
  (newVal) => {
    if (!newVal) return;
    if (newVal.length === 0) return;
    statesSelected.value = newVal;
    districtsSelected.value = [];
    level.value = LocationLevel.states;
  }
);
</script>

<template>
  <v-dialog max-width="800px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-chip
        prepend-icon="mdi-creation"
        rounded="xl"
        color="primary"
        border
        variant="tonal"
        class="mr-2 my-1 px-4 py-2"
        size="large"
        v-bind="activatorProps"
      >
        {{
          $vuetify.display.mdAndUp
            ? "Filter aus MII-Daten übernehmen"
            : "Filter aus MII-Daten"
        }}
      </v-chip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl">
        <v-toolbar color="transparent">
          <v-toolbar-title
            class="text-secondary font-weight-bold"
            style="width: 700px !important"
          >
            <v-icon class="mr-2">mdi-creation</v-icon>MII-Daten
            Filter</v-toolbar-title
          >

          <v-toolbar-items>
            <v-btn
              variant="text"
              prepend-icon="mdi-redo"
              color="primary"
              @click="resetFileInput"
              v-show="!showFileInput"
            >
              {{ $vuetify.display.smAndUp ? "Neue Datei laden" : "" }}
            </v-btn>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-0">
          <div v-show="showFileInput">
            <p>
              Hier können Sie einen Datensatz nach dem MII-Format laden. Wir
              durchsuchen Ihren Datensatz nach Ortsangaben, Zeiträumen und
              Altersgruppen. Daraus können Sie einfach Filter ableiten und damit
              die zusätzlichen Daten filtern.
            </p>
            <div class="text-end py-2">
              <v-btn
                variant="text"
                size="small"
                color="primary"
                prepend-icon="mdi-download"
                @click="downloadSampleData()"
              >
                Synthetische Daten zum ausprobieren</v-btn
              >
            </div>
            <v-file-input
              v-model="file"
              variant="solo"
              flat
              bg-color="#EAEAF6"
              rounded="xl"
              label="MII-Daten auswählen"
              placeholder="Welche Datensätze suchen Sie?"
              hide-details
              clearable
              class="pb-4"
              @change="onFileSelected"
            ></v-file-input>
          </div>
          <v-expand-transition>
            <div v-if="!!parsedData">
              <v-divider class="mb-2"></v-divider>
              <p>
                <v-icon color="primary" class="mr-1"
                  >mdi-check-circle-outline</v-icon
                >Datei erfolgreich gelesen! Es wurden
                <b>{{ parsedData.patients.length }} Patient:innen</b> und
                <b>{{ parsedData.encounters.length }} Kontakte</b> gefunden.
              </p>
              <v-list>
                <!--
                <v-list-item prepend-icon="mdi-map-marker-outline">
                  Die Patient:innen-Daten enthalten folgende
                  <b>Postleitzahlen</b>:
                  <v-chip
                    v-for="postalCode in patientPostalCodes"
                    :key="postalCode"
                    class="mr-1"
                    density="compact"
                    color="primary"
                  >
                    {{ postalCode }}</v-chip
                  >
                </v-list-item>
                -->
                <v-list-item prepend-icon="mdi-map-marker-outline">
                  <div v-if="patientStates.length > 0">
                    Die Patient:innen-Daten enthalten folgende
                    <b>Bundesländer</b>:
                    <v-chip
                      v-for="patientState in patientStates"
                      :key="patientState"
                      class="mr-1"
                      density="compact"
                      color="primary"
                    >
                      {{ patientState }}</v-chip
                    >
                  </div>
                  <div v-else>
                    Keine Adressdaten gefunden. Wie schlagen als Filter
                    'Bundesweit' vor.
                  </div>
                </v-list-item>
                <v-list-item prepend-icon="mdi-calendar-blank-outline">
                  Der <b>Zeitraum</b> der Kontakte liegt zwischen
                  <v-chip density="compact" color="primary">
                    {{ firstEncounterDate.toLocaleDateString("de-DE") }}</v-chip
                  >
                  und
                  <v-chip density="compact" color="primary">{{
                    lastEncounterDate.toLocaleDateString("de-DE")
                  }}</v-chip>
                </v-list-item>
                <v-list-item prepend-icon="mdi-shape-circle-plus">
                  Die <b>Altersgruppen</b> der Patien:innen sind:
                  <v-chip
                    v-for="ageGroup in ageGroups"
                    :key="ageGroup"
                    class="mr-1"
                    density="compact"
                    color="primary"
                  >
                    {{ ageGroup }}</v-chip
                  >
                </v-list-item>
              </v-list>
              <v-divider class="my-2"></v-divider>

              <div class="d-flex my-4">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  elevation="0"
                  rounded="xl"
                  append-icon="mdi-arrow-right"
                  @click="
                    isActive.value = false;
                    setFilters();
                  "
                  >Filter jetzt übernehmen</v-btn
                >
              </div>
            </div>
          </v-expand-transition>

          <!--Callout-->
          <v-alert
            v-if="error"
            type="error"
            color="#DF4567"
            variant="tonal"
            rounded="lg"
            class="mb-4"
          >
            <template #title>
              {{ error }}
            </template>
            <div>
              <p>
                Die Anwendung kann leider nur Daten im FHIR Bundle Format
                verarbeiten. Stelle sicher, dass:
              </p>
              <ul class="pl-6">
                <li>Die Datei valides JSON (ohne Syntax-Fehler) ist</li>
                <li><code>"resourceType"</code> ist <code>"Bundle"</code></li>
                <li>
                  Die Datei hat eine <code>"entry"</code> Liste mit validen
                  <code>resource</code> Objekten.
                </li>
              </ul>
            </div>
          </v-alert>
          <v-alert
            v-model="showCallout"
            variant="outlined"
            color="primary"
            icon="mdi-information"
            elevation="0"
            rounded="lg"
            closable
          >
            <template #title>
              <span class="font-weight-bold">Hinweis</span>
            </template>
            <span>
              Die Daten werden nicht übertragen und werden nur lokal in Ihrem
              Browser verarbeitet. Wenn Sie die Seite neu laden, gehen die Daten
              verloren.
            </span>
          </v-alert>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { parseMiiData } from "@/utils/miiParser";
import { type ParsedMiiData } from "@/types/mii";
import { useDataStore } from "@/stores/data";
import { useFilterStore } from "@/stores/filters";

const dataStore = useDataStore();
const filterStore = useFilterStore();

const showCallout = ref(true);
const showFileInput = ref(true);

const file = ref<File | null>(null);

const parsedData = ref<ParsedMiiData | null>(null);

const resetFileInput = () => {
  showFileInput.value = true;
  parsedData.value = null;
  file.value = null;
};

const error = ref<any | null>(null);

function onFileSelected() {
  if (!file.value) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    // reset error message
    error.value = null;
    try {
      const rawText = e.target?.result as string;
      const parsed = parseMiiData(rawText);

      parsedData.value = parsed;

      showFileInput.value = false;
    } catch (err) {
      error.value = err;
      console.error("Parsing error:", err);
    }
  };

  reader.readAsText(file.value);
}

// function to map zipCode to state using datastore.kreisData

const mapZipCodeToState = (zipCode: string) => {
  const kreisData = dataStore.kreisData;
  const kreis = kreisData.find((k) => k.zipCode.startsWith(zipCode));
  return kreis?.bundesland ?? "Unbekannt";
};

const patientStates = computed(() => {
  if (!parsedData.value) return [];

  const states = parsedData.value.patients.map((pat) => {
    const state = mapZipCodeToState(pat.address[0].postalCode);
    return state;
  });

  // Remove duplicates
  return Array.from(new Set(states));
});

const encounterDates = computed(() => {
  if (!parsedData.value) return [];

  const dates = parsedData.value.encounters.map(
    (enc) => new Date(enc.period.start)
  );
  return dates.sort((a, b) => a.getTime() - b.getTime());
});

const firstEncounterDate = computed(() => {
  if (!encounterDates.value.length) return new Date();
  return encounterDates.value[0];
});

const lastEncounterDate = computed(() => {
  if (!encounterDates.value.length) return new Date();
  return encounterDates.value[encounterDates.value.length - 1];
});

const ageGroups = computed(() => {
  if (!parsedData.value) return [];

  const ageGroups = parsedData.value.patients.map((pat) => {
    // todo: we can move this to date utils (on another branch)
    const birthDate = new Date(pat.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age <= 4) return "00-04";
    if (age <= 14) return "05-14";
    if (age <= 34) return "15-34";
    if (age <= 59) return "35-59";
    if (age <= 79) return "60-79";
    return "80+";
  });

  // Remove duplicates
  return Array.from(new Set(ageGroups));
});

const setFilters = () => {
  if (!parsedData.value) return;

  filterStore.startDate = firstEncounterDate.value.toDateString();
  filterStore.endDate = lastEncounterDate.value.toDateString();
  filterStore.locationStates = patientStates.value;
  filterStore.locationDistricts = [];
  filterStore.age = ageGroups.value;
};

const downloadSampleData = () => {
  // sample data is in the public folder
  const url = "/2024-12-02_mii_testdaten_small.json";

  // download the file

  const a = document.createElement("a");
  a.href = url;
  a.download = "mii-data.json";
  a.click();
};
</script>

<style>
.v-table .v-table__wrapper > table > thead > tr > th {
  background-color: #e2eef2 !important;
}
</style>

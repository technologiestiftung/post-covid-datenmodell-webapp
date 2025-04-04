<template>
  <v-list-item
    color="secondary"
    class="mt-2"
    rounded="xl"
    :value="1"
    @click="matchData()"
  >
    <template #title>
      <span class="text-subtitle-1 font-weight-bold">
        Abwassersurveillance AMELAG am Wohnort der Patient:innen
      </span>
    </template>

    <span class="text-caption">
      Die ausgewählten Abwassersurveillance AMELAG Stationen werden verknüpft
      mit den URIs der Patient:innen-Einträge in Ihrer MII-Datei.
    </span>
  </v-list-item>
  <v-divider />
</template>

<script setup lang="ts">
import { useMatchedDataStore } from "@/stores/matching";
import { useExportStore } from "@/stores/export";
import { useDataStore } from "@/stores/data";
import { findNearestStation } from "@/utils/geoTransformation";
import { useFilterStore } from "@/stores/filters";
import { useNotificationStore } from "@/stores/notifications";
import { type ParsedMiiData } from "@/types/mii";
import abwasserStandorte from "../data/2024_11_26_abwasser_standorte.json";
import { LocationLevel } from "../types/metadata";

const matchedDataStore = useMatchedDataStore();
const exportStore = useExportStore();
const dataStore = useDataStore();
const filterStore = useFilterStore();
const notificationsStore = useNotificationStore();

const props = defineProps<{
  miiData: ParsedMiiData;
}>();

const matchData = () => {
  if (!exportStore.exportDatasets) {
    notificationsStore.addNotification("Fehler beim Laden der Exportdaten");
    return;
  }

  const exportData = exportStore.exportDatasets.find(
    (data) => data.id === "sewage-water"
  );

  if (!exportData) {
    notificationsStore.addNotification("Fehler beim Laden der Exportdaten");
    return;
  }

  // Find nearest station for each patient
  const patientsWithStations = props.miiData.patients.map((patient: any) => {
    const patientPostalCode = patient.address[0].postalCode;

    // todo: handle unfinished plz data
    const patientLocation = dataStore.kreisData.find(
      (entry) => entry.zipCode === patientPostalCode
    );

    // todo: handle missing location data
    if (!patientLocation) {
      console.log(`No location found for postal code: ${patientPostalCode}`);
      return {
        patientId: patient.id,
        stationName: undefined,
      };
    }

    // todo: we cant make sure that the filters in the end are the filters applied to the exported data?
    // todo: solve with re-fetch?
    const locationLevel: LocationLevel =
      filterStore.filterParams.locationStates?.length > 0
        ? LocationLevel.states
        : filterStore.filterParams.locationDistricts?.length > 0
        ? LocationLevel.districts
        : LocationLevel.germany;

    // default (for germany or missings)
    let relevantStandorte = undefined;

    // apply filters to patients
    if (locationLevel === LocationLevel.germany) {
      // all are relevant
      relevantStandorte = abwasserStandorte;

      // Find the nearest station for this patient
      const nearestStation = findNearestStation(
        patientLocation.geoPoint.lat,
        patientLocation.geoPoint.lng,
        relevantStandorte,
        "lat",
        "long"
      );

      return {
        patientId: patient.id,
        stationName: nearestStation.Kläranlage,
      };
    }
    // filter for state
    if (locationLevel === LocationLevel.states) {
      // case: patient is not in the selected states
      if (
        !filterStore.filterParams.locationStates.includes(
          patientLocation.bundesland
        )
      ) {
        return {
          patientId: patient.id,
          stationName: undefined,
        };
      }
      // get additional data (standorte) for the selected states
      const additionalData = abwasserStandorte.filter((d: any) =>
        filterStore.locationStates.includes(d.Bundesland)
      );

      relevantStandorte = additionalData;

      if (!relevantStandorte) {
        return;
      }

      // Find the nearest station for this patient
      const nearestStation = findNearestStation(
        patientLocation.geoPoint.lat,
        patientLocation.geoPoint.lng,
        relevantStandorte,
        "lat",
        "long"
      );

      return {
        patientId: patient.id,
        stationName: nearestStation.Kläranlage,
      };
    } else if (locationLevel === LocationLevel.districts) {
      // filter for district -> find the relevant Bundesland?
      // todo: If a patients district is not included should he still be here if his bundesland ist included?

      // case: patient is not in the selected states
      if (
        !filterStore.filterParams.locationDistricts.includes(
          patientLocation.name
        )
      ) {
        return {
          patientId: patient.id,
          stationName: undefined,
        };
      }
      // get additional data (standorte) for the selected states
      const additionalData = dataStore.kreisData.filter((d) =>
        filterStore.locationDistricts.includes(d.name)
      );

      // we need to aggregate up to bundesländer because we can't directly map districts to standorte
      const relevantBundesländer = additionalData.map((d) => d.bundesland);

      // match with standorte data
      const standorte = abwasserStandorte.filter((d: any) =>
        relevantBundesländer.includes(d.Bundesland)
      );

      relevantStandorte = standorte;

      if (!relevantStandorte) {
        return;
      }
      // Find the nearest station for this patient
      const nearestStation = findNearestStation(
        patientLocation.geoPoint.lat,
        patientLocation.geoPoint.lng,
        relevantStandorte,
        "lat",
        "long"
      );

      return {
        patientId: patient.id,
        stationName: nearestStation.Kläranlage,
      };
    }
  });

  // Then create the matched dataset
  const matchedData = {
    headers: [...exportData.data.headers, "patient_id"],
    rows: exportData.data.rows
      .map((row) => {
        // Find patients whose nearest station is this row
        const matchingPatients = patientsWithStations.filter(
          (patient: any) => patient.stationName === row.standort
        );

        if (matchingPatients.length === 0) {
          return []; // No patients matched this station
        }

        // Create a copy of this row for each matching patient
        return matchingPatients.map((patient: any) => ({
          ...row,
          patient_id: patient.patientId,
        }));
      })
      .flat(),
  };

  if (matchedData.rows.length === 0) {
    notificationsStore.addNotification(
      "Keine Patient:innen gefunden, die mit den Abwasserdaten verknüpft werden können. Ändern Sie gegebenfalls die Filtereinstellungen."
    );
    return;
  }
  // Store the matched data
  matchedDataStore.setMatchedData({
    id: exportData.id,
    format: exportData.format,
    export_fields: exportData.export_fields,
    data: matchedData,
  });
};
</script>

<template>
  <v-dialog :fullscreen="isExtended">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="isInExportList"
        class="text-none"
        prepend-icon="mdi-chart-bar"
        rounded="xl"
        color="primary"
        variant="text"
        block
        v-bind="activatorProps"
      >
        Chart
        <template v-slot:append>
          <v-badge color="info" content="beta" inline></v-badge>
        </template>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="xl">
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-secondary font-weight-bold">{{
            dataEntry.title
          }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
            <v-btn
              :icon="!isExtended ? 'mdi-arrow-expand' : 'mdi-arrow-collapse'"
              @click="isExtended = !isExtended"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-if="data"
                v-model="selectedAttribute"
                :items="availableAttributes"
                item-title="id"
                variant="outlined"
                label="Attribut"
                return-object
                mandatory
                rounded="xl"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-if="data && filterAttribute"
                v-model="selectedFilterValue"
                :items="availableFilterValues"
                item-title="id"
                variant="outlined"
                :label="'Ort' + ' (' + filterAttribute.id + ')'"
                return-object
                rounded="xl"
                mandatory
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-if="data && ageAttribute"
                v-model="selectedAgeValue"
                :items="availableAgeValues"
                item-title="id"
                variant="outlined"
                :label="'Altersgruppe' + ' (' + ageAttribute.id + ')'"
                return-object
                rounded="xl"
                mandatory
              >
              </v-select>
            </v-col>
          </v-row>

          <p class="text-overlinel">{{ selectedAttribute.description }}</p>
          <div style="height: 400px">
            <v-chart
              autoresize
              style="height: 400px"
              :option="option"
              theme="theme"
            ></v-chart>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import { type MetaDataEntry } from "../types/metadata";
import { useExportStore } from "@/stores/export";

const props = defineProps<{
  dataEntry: MetaDataEntry;
}>();

const exportStore = useExportStore();
const isInExportList = computed(() => {
  return exportStore.exportDatasets.some(
    (dataset) => dataset.id === props.dataEntry.id
  );
});

const data = computed(() => {
  return isInExportList.value
    ? exportStore.exportDatasets.find(
        (dataset) => dataset.id === props.dataEntry.id
      )?.data
    : {
        headers: [],
        rows: [],
      };
});

const availableAttributes = computed(() => {
  return props.dataEntry.attributes_meta.filter((attribute) => {
    return attribute.type === "float" || attribute.type === "integer";
  });
});

const selectedAttribute = ref(availableAttributes.value[0]);

const timeAttribute = computed(() => {
  return props.dataEntry.attributes_meta.find(
    (attribute) => attribute.time_attribute
  );
});

const filterAttribute = computed(() => {
  return props.dataEntry.attributes_meta.find(
    (attribute) => attribute.location_attribute
  );
});

const ageAttribute = computed(() => {
  return props.dataEntry.attributes_meta.find(
    (attribute) => attribute.age_attribute
  );
});

const availableAgeValues = computed(() => {
  if (!ageAttribute.value) return [];

  // return a set of values for the age attribute in the data (return as array)
  return Array.from(
    new Set(data.value?.rows.map((row) => row[ageAttribute.value!.id]) || [])
  );
});

const selectedAgeValue = ref<any>(availableAgeValues.value[0]);

const availableFilterValues = computed(() => {
  if (!filterAttribute.value) return [];

  // return a set of values for the filter attribute in the data (return as array)
  return Array.from(
    new Set(data.value?.rows.map((row) => row[filterAttribute.value!.id]) || [])
  );
});

const selectedFilterValue = ref<any>(availableFilterValues.value[0]);

const filterData = computed(() => {
  if (!filterAttribute.value || !selectedFilterValue.value) return data.value;

  // filter rows by selected filter value

  if (filterAttribute.value && !ageAttribute.value) {
    return {
      headers: data.value?.headers,
      rows: data.value?.rows.filter(
        (row) => row[filterAttribute.value!.id] === selectedFilterValue.value
      ),
    };
  }

  if (filterAttribute.value && ageAttribute.value) {
    return {
      headers: data.value?.headers,
      rows: data.value!.rows.filter(
        (row) =>
          row[filterAttribute.value!.id] === selectedFilterValue.value &&
          row[ageAttribute.value!.id] === selectedAgeValue.value
      ),
    };
  }

  if (!filterAttribute.value && ageAttribute.value) {
    return {
      headers: data.value?.headers,
      rows: data.value!.rows.filter(
        (row) => row[ageAttribute.value!.id] === selectedAgeValue.value
      ),
    };
  }

  return data.value;
});

const option = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
    },
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "time",
    },
    series: [
      {
        data:
          filterData.value?.rows?.map((row) => [
            row[timeAttribute.value?.id || 0],
            row[selectedAttribute.value.id],
          ]) || [],
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          width: 2,
        },
      },
    ],
  };
});

// todo: add to store?
const isSelected = ref(false);
const isExtended = ref(false);
const showSource = ref(false);
</script>

<style>
.v-table .v-table__wrapper > table > thead > tr > th {
  background-color: #e2eef2 !important;
}
</style>

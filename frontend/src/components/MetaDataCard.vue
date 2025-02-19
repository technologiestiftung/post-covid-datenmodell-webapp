<template>
  <v-card flat rounded="xl" class="pa-4 mb-4">
    <v-card-title>
      <v-row>
        <v-col cols="12" md="7" sm="12">
          <p style="white-space: normal">
            {{ dataEntry.title }}
          </p>
        </v-col>
        <v-col
          v-if="mdAndUp"
          cols="12"
          md="5"
          class="d-flex align-top justify-end"
        >
          <v-btn
            icon
            variant="outlined"
            color="primary"
            size="x-small"
            @click="isSelected = !isSelected"
          >
            <v-icon>
              {{ isSelected ? "mdi-star" : "mdi-star-outline" }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            :prepend-icon="isExtended ? 'mdi-minus' : 'mdi-plus'"
            variant="flat"
            color="primary"
            rounded
            @click="isExtended = !isExtended"
          >
            {{ isExtended ? "weniger Infos" : "mehr Infos" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="py-4">
      <!-- description -->
      <p>{{ dataEntry.description }}</p>
      <br />

      <!-- Schlüsselattribute -->
      <div class="d-flex align-center">
        <b class="pr-4">Schlüsselattribute </b>
        <v-chip-group column>
          <v-chip
            v-for="chip in dataEntry.filter_attributes"
            color="primary"
            variant="tonal"
            >{{ chip }}
          </v-chip>
        </v-chip-group>
      </div>
      <br />

      <!-- Available Attributes -->
      <v-row>
        <v-col cols="12" sm="6" v-if="dataEntry.availability_temporal">
          <b class="mr-4">Zeitspanne </b>
          <v-chip>
            {{ dataEntry.availability_temporal.start_date }} -
            {{ dataEntry.availability_temporal.end_date }}
          </v-chip>
        </v-col>
        <v-col cols="12" sm="6" v-if="dataEntry.availability_spatial">
          <b class="mr-4">Ort </b>
          <v-chip>
            {{ dataEntry.availability_spatial.country }}
          </v-chip>
        </v-col>
      </v-row>
      <br />

      <!-- Quelle -->
      <p>
        <b class="pr-4">Quelle </b> {{ dataEntry.source }}
        <v-icon @click="showSource = !showSource">{{
          showSource ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </p>
      <br />

      <div v-if="showSource">
        <v-row>
          <v-col cols="12" sm="4">
            <b>Kontakt</b>
            <p v-html="dataEntry.contact.address"></p>
          </v-col>
          <v-col cols="12" sm="4">
            <b>Erreichbarkeit</b>
            <br />
            <v-icon>mdi-email</v-icon>{{ dataEntry.contact.phone_number }}
            <br />
            <v-icon>mdi-phone</v-icon>{{ dataEntry.contact.email }}
          </v-col>
          <v-col cols="12" sm="4">
            <b>Aktualisiert</b> <br />
            {{ dataEntry.last_updated }}
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <!-- More Information -->
    <div v-if="isExtended">
      <v-card-title>Attribute im Datensatz</v-card-title>
      <v-card-text>
        Konfigurieren Sie den Datensatz nach den für Sie relevanten Attribute
        vor dem Export, indem Sie per Klick an- oder abwählen.
        <v-chip-group column>
          <v-chip v-for="chip in dataEntry.attributes">{{ chip }} </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-title>Dateiformate</v-card-title>
      <v-card-text>
        Wählen Sie ein passendes Dateigormat vor dem Download aus per Klick
        an-oder abwählen.
        <v-chip-group column>
          <v-chip v-for="chip in dataEntry.data_formats">{{ chip }} </v-chip>
        </v-chip-group>
      </v-card-text>
    </div>
    <v-card-actions v-if="smAndDown">
      <v-row>
        <v-col cols="12" md="5" class="d-flex align-top justify-end">
          <v-btn
            icon
            variant="outlined"
            color="primary"
            size="x-small"
            @click="isSelected = !isSelected"
          >
            <v-icon>
              {{ isSelected ? "mdi-star-outline" : "mdi-star" }}
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            :prepend-icon="isExtended ? 'mdi-minus' : 'mdi-plus'"
            variant="flat"
            color="primary"
            rounded
            @click="isExtended = !isExtended"
          >
            {{ isExtended ? "weniger Infos" : "mehr Infos" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { type MetaDataEntry } from "../types/metadata";
import { mdiStarOutline, mdiStar } from "@mdi/js";

const { smAndDown, mdAndUp } = useDisplay();

const props = defineProps<{
  dataEntry: MetaDataEntry;
}>();

// todo: add to store?
const isSelected = ref(false);
const isExtended = ref(false);
const showSource = ref(false);
</script>

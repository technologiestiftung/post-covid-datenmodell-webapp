<template>
  <v-alert
    type="error"
    v-if="error"
    rounded="xl"
    dismissible
    color="#F64C72"
    elevation="0"
    class="mb-8"
    >Da ist leider etwas schief gegangen. Bitte kontaktieren Sie uns per
    E-Mail.</v-alert
  >
  <form
    name="suggest-data"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="3">
        <h3 class="text-secondary">
          Angaben zum <br />
          Datensatz
        </h3></v-col
      >
      <v-col cols="12" md="9">
        <v-text-field
          label="Titel des Datensatzes"
          variant="outlined"
          name="title"
          v-model="data.title"
        >
          <template #append-inner>
            <v-icon color="#F64C72">mdi-asterisk</v-icon></template
          ></v-text-field
        >
        <v-text-field
          label="URL des Datensatzes"
          variant="outlined"
          name="url"
          v-model="data.url"
        >
          <template #append-inner>
            <v-icon color="#F64C72">mdi-asterisk</v-icon></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="12" md="3">
        <h3 class="text-secondary">
          Personenbezogene <br />
          Daten
        </h3></v-col
      >
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="6" class="py-0 my-0">
            <v-text-field
              label="Nachname"
              variant="outlined"
              name="nachname"
              v-model="data.nachname"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="py-0 my-0">
            <v-text-field
              label="Vorname"
              variant="outlined"
              name="vorname"
              v-model="data.vorname"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <v-text-field
              label="E-Mail-Adresse"
              variant="outlined"
              name="email"
              v-model="data.email"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-subtitle-1">
              Falls Kontaktdaten in diesem Formular angegeben wurden, willige
              ich ein, dass die Daten von den Betreibenden des Datenmodells
              verwendet werden dürfen, um mich bei Rückfragen über den Datensatz
              zu kontaktieren.
            </p>
            <v-checkbox
              label="Zustimmen"
              name="zustimmung"
              color="secondary"
              v-model="data.zustimmung"
            ></v-checkbox>
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                elevation="0"
                @click="handleSubmit"
                rounded="xl"
                :disabled="!data.url || !data.title"
                append-icon="mdi-arrow-right"
                >Vorschlag absenden</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const error = ref(false);

const data = ref({
  title: "",
  url: "",
  nachname: "",
  vorname: "",
  email: "",
  zustimmung: false,
});

const encode = (data: Record<string, any>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const handleSubmit = () => {
  const axiosConfig = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  axios
    .post(
      "/",
      encode({
        "form-name": "suggest-data",
        ...data.value,
      }),
      axiosConfig
    )
    .then(() => {
      data.value = {
        title: "",
        url: "",
        nachname: "",
        vorname: "",
        email: "",
        zustimmung: false,
      };
      window.scrollTo(0, 0);
      router.push({ name: "DataSuggestionSuccess" });
    })
    .catch(() => {
      window.scrollTo(0, 0);
      error.value = true;
    });
};
</script>

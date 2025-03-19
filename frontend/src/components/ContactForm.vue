<template>
  <v-alert
    v-if="error"
    type="error"
    rounded="xl"
    dismissible
    color="#F64C72"
    elevation="0"
    class="mb-8"
  >
    Da ist leider etwas schief gegangen. Bitte kontaktieren Sie uns per E-Mail.
  </v-alert>
  <form
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <v-row>
      <v-col cols="12" md="3">
        <h3 class="text-secondary">
          Angaben zu Ihrer <br />
          Anfrage
        </h3>
      </v-col>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="6" class="py-0 my-0">
            <v-text-field
              v-model="data.nachname"
              label="Nachname"
              variant="outlined"
              name="nachname"
            />
          </v-col>
          <v-col cols="12" md="6" class="py-0 my-0">
            <v-text-field
              v-model="data.vorname"
              label="Vorname"
              variant="outlined"
              name="vorname"
            />
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <v-text-field
              v-model="data.email"
              label="E-Mail-Adresse"
              variant="outlined"
              name="email"
            >
              <template #append-inner>
                <v-icon color="#F64C72">mdi-asterisk</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 my-0">
            <v-textarea
              v-model="data.request"
              label="Ihr Anliegen"
              variant="outlined"
              name="request"
            >
              <template #append-inner>
                <v-icon color="#F64C72">mdi-asterisk</v-icon>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-subtitle-1">
              Falls Kontaktdaten in diesem Formular angegeben wurden, willige
              ich ein, dass die Daten von den Betreibenden des Datenmodells
              verwendet werden dürfen, um mich bei Rückfragen zu kontaktieren.
            </p>
            <v-checkbox
              v-model="data.zustimmung"
              label="Zustimmen"
              name="zustimmung"
              color="secondary"
            >
              <template #append>
                <v-icon color="#F64C72">mdi-asterisk</v-icon>
              </template>
            </v-checkbox>
            <div class="d-flex">
              <v-spacer />
              <v-btn
                color="primary"
                elevation="0"
                @click="handleSubmit"
                rounded="xl"
                :disabled="!data.request || !data.email || !data.zustimmung"
                append-icon="mdi-arrow-right"
              >
                Anfrage absenden
              </v-btn>
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
  request: "",
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
        "form-name": "contact",
        ...data.value,
      }),
      axiosConfig
    )
    .then(() => {
      data.value = {
        request: "",
        nachname: "",
        vorname: "",
        email: "",
        zustimmung: false,
      };
      window.scrollTo(0, 0);
      router.push({ name: "ContactPageSuccess" });
    })
    .catch(() => {
      window.scrollTo(0, 0);
      error.value = true;
    });
};
</script>

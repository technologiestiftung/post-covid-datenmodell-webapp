<template>
  <div class="d-flex flex-column" style="min-height: 90vh">
    <v-row
      class="justify-center flex-grow-0 py-8"
      style="background-color: #c6dee6"
    >
      <v-col cols="11" md="8">
        <div class="d-flex py-2">
          <h1 class="text-secondary">Kontakt</h1>
        </div>
        <v-row>
          <v-col cols="12" md="8">
            <p class="pb-4">
              Füllen Sie das Kontaktformular aus und wir melden uns bei Ihnen.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-center flex-grow-0 py-8">
      <v-col cols="11" md="8">
        <ContactForm />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "../components/ContactForm.vue";
</script>

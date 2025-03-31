<template>
  <div id="success" class="d-flex flex-column">
    <v-row
      class="justify-center flex-grow-0 py-8"
      style="background-color: #c6dee6"
    >
      <v-col cols="11" md="11" class="text-center">
        <div class="py-8 text-center">
          <h1 class="text-secondary">
            Ihre Anfrage wurde erfolgreich gesendet.
          </h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-center flex-grow-0 py-8">
      <v-col cols="11" md="8">
        <div class="d-flex flex-column py-2 text-center">
          <div class="d-flex">
            <v-spacer />
            <v-icon size="124" color="primary">mdi-check-circle-outline</v-icon>
            <v-spacer />
          </div>
          <h2 class="text-secondary">
            Ihre Anfrage wurden empfangen! Wir melden uns zweitnah bei Ihnen.
          </h2>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

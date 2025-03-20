<template>
  <div class="d-flex flex-column" style="min-height: 90vh">
    <v-row class="justify-center py-8" style="background-color: #d5d5ec">
      <v-col cols="11" md="8">
        <div class="d-flex py-2">
          <h1 class="text-secondary">FAQ - Häufig gestellte Fragen</h1>
        </div>
        <v-row>
          <v-col cols="12" md="8">
            <p class="pb-4">
              Willkommen im FAQ-Bereich. Hier finden Sie Antworten auf häufig
              gestellte Fragen zum Datenmodell - etwa zur Integration neuer
              Daten und zur Verarbeitung bzw. Verknüpfung von Datensätzen.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-center pt-8">
      <v-col cols="11" md="8">
        <h2 class="text-secondary">Nutzung des Datenmodells: How-to</h2>
        <v-responsive aspect-ratio="16/9" min-height="400px" class="pt-2">
          <iframe
            src="https://player.vimeo.com/video/76979871"
            width="100%"
            height="100%"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          />
        </v-responsive>
      </v-col>
    </v-row>
    <v-row class="justify-center pt-8">
      <v-col cols="11" md="8">
        <h2 class="text-secondary">Über das Post-Covid-Datenmodell</h2>
        <v-expansion-panels elevation="0" bg-color="#fbfbfd">
          <v-expansion-panel
            v-for="item in faqData.filter((d) => d.category == 'about')"
            :key="item.id"
          >
            <v-expansion-panel-title>
              <div v-html="item.question" />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div v-html="item.answer" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="justify-center pt-8">
      <v-col cols="11" md="8">
        <h2 class="text-secondary">
          Gestalten Sie mit uns das Datenmodell, indem Sie offene Daten
          beitragen!
        </h2>
        <v-expansion-panels elevation="0" bg-color="#fbfbfd">
          <v-expansion-panel
            v-for="item in faqData.filter(
              (d) => d.category == 'data_contribution'
            )"
            :key="item.id"
          >
            <v-expansion-panel-title>
              <div v-html="item.question" />
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div v-html="item.answer" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="justify-center py-2">
      <v-col cols="11" md="8">
        <v-alert type="info" color="primary" variant="tonal" rounded="xl">
          <template #title> Hier können Sie Daten beitragen </template>
          <p>
            Sie haben Daten, die Sie gerne in das Post-Covid-Datenmodell
            einbringen möchten? Dann nutzen Sie die Möglichkeit, uns Ihre Daten
            vorzuschlagen.
          </p>
          <div class="text-end">
            <v-btn
              color="primary"
              variant="flat"
              :to="{ name: 'DataSuggestion' }"
              rounded="xl"
              class="mx-1"
            >
              Zum Formular
            </v-btn>
          </div>
        </v-alert>
      </v-col>
    </v-row>
    <v-row class="justify-center pt-8">
      <v-col cols="11" md="8">
        <h2 class="text-secondary">
          Bei weiteren Fragen, treten Sie gerne in Kontakt
        </h2>
      </v-col>
    </v-row>
    <v-row class="justify-center pt-2 pb-4">
      <v-col cols="11" md="8">
        <ContactForm />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import ContactForm from "../components/ContactForm.vue";
import faqData from "../data/2025-03-19_faq_texts.json";
</script>

<template>
  <div class="banner-section d-flex flex-column pa-12">
    <v-spacer></v-spacer>
    <div>
      <h1 class="banner-title mt-16 text-h4 text-md-h2">
        Finden Sie genau die Datensätze, die Ihre Forschung mit MII-Daten
        voranbringen.
      </h1>
      <p class="banner-subtitle mt-12 text-h7 text-md-h5">
        Dieser Metadatenkatalog hilft Ihnen, offene Datensätze zu finden, die
        perfekt mit MII-Daten kompatibel sind. Mit flexiblen Filtern und
        Downloads im richtigen Format sparen Sie wertvolle Zeit bei der
        Datenvorbereitung.
      </p>
    </div>
  </div>
  <v-row class="d-flex flex-column align-center">
    <v-col cols="11" md="8" xl="6">
      <v-container>
        <div class="d-flex flex-column align-center pt-5">
          <v-text-field
            v-model="searchString"
            variant="solo"
            flat
            bg-color="#EAEAF6"
            rounded="xl"
            placeholder="Welche Datensätze suchen Sie?"
            hide-details
            clearable
            width="85%"
            density="comfortable"
            prepend-inner-icon="mdi-magnify"
          >
            <template #append-inner>
              <v-btn icon variant="text" @click="search">
                <v-icon
                  size="large"
                  :color="searchString?.length > 0 ? 'secondary' : '#ACACDA'"
                  >mdi-arrow-right-circle</v-icon
                >
              </v-btn>
            </template>
          </v-text-field>

          <div class="d-flex mt-2 flex-wrap justify-center">
            <v-btn
              class="ma-2 text-capitalize text-primary text-body-2 px-4 py-2"
              variant="outlined"
              rounded="xl"
              @click="searchString = 'Rehabilitation'"
            >
              Rehabilitation
            </v-btn>

            <v-btn
              class="ma-2 text-capitalize text-primary text-body-2 px-4 py-2"
              variant="outlined"
              rounded="xl"
              @click="searchString = 'Wetter'"
            >
              Wetter
            </v-btn>

            <v-btn
              class="ma-2 text-capitalize text-primary text-body-2 px-4 py-2"
              variant="outlined"
              rounded="xl"
              @click="searchString = 'Emissionen'"
            >
              Emissionen
            </v-btn>

            <v-btn
              class="ma-2 text-capitalize text-primary text-body-2 px-4 py-2"
              variant="outlined"
              rounded="xl"
              @click="searchString = 'Sozialstruktur'"
            >
              Sozialstruktur
            </v-btn>

            <v-btn
              class="ma-2 text-capitalize px-4 py-2"
              color="secondary"
              flat
              rounded="xl"
              @click="
                searchString = '';
                search();
              "
            >
              Alle Datensätze
            </v-btn>
          </div>
        </div>
        <p class="text-h4 mt-10 text-secondary" style="font-weight: 600">
          Daten sortieren und für MII-Daten anpassen
        </p>
        <p class="text-body-1 mt-5 text-secondary">
          Mit unserer Webanwendung können Sie sofort passende offene Datensätze
          finden, die sich mit dem Kerndatensatz der Medizinformatikinitative
          verschneiden lassen, zum Beispiel über räumlichen oder zeitlichen
          Bezug oder über Altersgruppe und Geschlecht. Die Anwendung erlaubt
          ebenfalls eine Filterung nach Thema und bereitet die offenen Daten
          automatisch in einem kompatiblen Format vor – bereit für eine nahtlose
          Integration mit Ihren MII-Daten.
        </p>
        <p class="mt-12 font-weight-bold">
          Filtern nach MII-Schlüsselattributen
        </p>
        <AttributeCategories />
      </v-container>
    </v-col>
  </v-row>
  <div class="bg-home-white">
    <v-row class="d-flex flex-column align-center">
      <v-col cols="11" md="8" xl="6">
        <v-container>
          <p class="text-h4 mt-10 text-secondary" style="font-weight: 600">
            Vier Datenwelten für umfassende Analysen
          </p>
          <p class="text-body-1 mt-5 text-secondary">
            Erkunden Sie, wie Umweltbedingungen, lokale Gesundheitsressourcen,
            sozioökonomische Faktoren und demografische Merkmale das Leben und
            die Erholung von Long-COVID-Betroffenen beeinflussen. Filtern und
            sortieren Sie relevante Datensätze, um tiefere Einblicke zu gewinnen
            und fundierte Antworten auf Ihre Forschungsfragen zu finden.
          </p>
        </v-container>
      </v-col>
    </v-row>
  </div>
  <div class="bg-home-white mb-10">
    <v-row class="d-flex flex-column align-center">
      <v-col cols="12" md="10" xl="10">
        <v-container>
          <v-row justify="center" class="mt-0">
            <v-col cols="12" md="6" height="100%">
              <HomeDataWorld
                icon="umwelt"
                title="Umwelt"
                subtitle="Wenn Luftqualität zur Gesundheitsfrage wird"
                description="Untersuche den Einfluss von Umweltfaktoren wie z.B. die Luftqualität auf Post-Covid-Verläufe. Gibt es zeitliche oder regionale Unterschiede? Sind bestimmte Personen- oder Altersgruppen stärker durch Umweltbelastungen gefährdet? Identifizieren Sie potenzielle Risikofaktoren."
              />
            </v-col>

            <v-col cols="12" md="6" class="bg-home-white" height="100%">
              <HomeDataWorld
                icon="gesundheit"
                title="Gesundheit"
                subtitle="Reha-Angebote für ein starkes Comeback"
                description="Erkunden Sie die medizinische Versorgung in Deutschland. Welche und wie viele Reha- und Pflegeangebote stehen Post-Covid-Patienten in Ihrer Region zur Verfügung? Wie steht es um die Zugänglichkeit dieser Angebote für betroffene Patienten? Werfen Sie einen Blick auf die Gesundheits-Infrastruktur."
              />
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-0">
            <v-col cols="12" md="6" height="100%">
              <HomeDataWorld
                icon="gesellschaft"
                title="Gesellschaft"
                subtitle="Sozioökonomische Hürden im Blick"
                description="Analysieren Sie den Zusammenhang zwischen sozioökonomischen Faktoren wie z. B. Bildungsniveau oder durchschnittliches Einkommen und Post-Covid. Wie wirken sich unterschiedliche Lebenssituationen auf das Risiko einer Post-Covid-Erkrankung und die Chancen auf eine erfolgreiche Genesung aus? Stellen Sie Hypothesen auf."
              />
            </v-col>

            <v-col cols="12" md="6" height="100%">
              <HomeDataWorld
                icon="demografie"
                title="Demografie"
                subtitle="Jede Altersgruppe zählt: Gesundheit nach Maß"
                description="Erforschen Sie Muster in den medizinischen Daten anhand demografischer Einflussfaktoren wie Alter und Geschlecht. Welche Schlüsse lassen sich in Bezug auf Prävention sowie bedarfsorientierte Behandlung und Genesung von Post-Covid-Patienten ableiten? Identifizieren Sie Risikogruppen."
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HomeDataWorld from "../components/HomeDataWorld.vue";
import AttributeCategories from "../components/AttributeCategories.vue";
import { useExportStore } from "../stores/export";
import { useFilterStore } from "@/stores/filters";
import { useRouter } from "vue-router";

const exportStore = useExportStore();
const filterStore = useFilterStore();
const router = useRouter();

const searchString = ref<string>("");

// reset search string
filterStore.search = "";

const search = () => {
  filterStore.search = searchString.value;
  filterStore.filterCategory = undefined;
  window.scrollTo(0, 0);
  router.push({ name: "DataList" });
};
</script>

<style scoped>
.banner-section {
  background-image: url("../assets/landing-page-image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: left;
  min-height: 700px;
}

.banner-title {
  color: var(--white, #fff);
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 75px */
  max-width: 1000px;
}

.banner-subtitle {
  max-width: 1000px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}

.bg-home-surface {
  background-color: #eaeaf6;
}

.bg-home-white {
  background-color: #ffffff;
}

.remove-top-margin {
  margin-top: -64px !important;
}
.remove-left-right-margin {
  margin-left: -29px !important;
  margin-right: -29px !important;
}

.remove-left-right-margin-xs {
  margin-left: -23px !important;
  margin-right: -23px !important;
}

.remove-left-right-margin-lg {
  margin-left: -25px !important;
  margin-right: -25px !important;
}
</style>

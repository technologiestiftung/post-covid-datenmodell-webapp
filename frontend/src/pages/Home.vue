<template>  
  <div class="d-flex flex-column">
    <v-container class="remove-top-margin pa-3">
      <v-row 
        justify="center" 
        class="remove-left-right-margin"
      >
        <v-col 
          cols="12" 
          lg="12" 
          xl="12" 
          xxl="12"
        >          
          <div class="banner-section d-flex flex-column pa-10">            
            <h1 class="banner-title   mt-15 text-h4">
              Finden Sie genau die Datensätze, die Ihre Forschung mit MII-Daten voranbringen.
            </h1>
            <p class="banner-subtitle  mt-5">
              Dieser Metadatentkatalog hilft Ihnen, offene Datensätze zu finden, die perfekt mit
              MII-Daten kompatibel sind. Mit flexiblen Filtern und Downloads im richtigen Format sparen Sie
              wertvolle Zeit bei der Datenvorbereitung.
            </p>
          </div>
        </v-col>
      </v-row>    
      <v-row 
        justify="center" 
        class="bg-home-surface mt-0"
      >
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="6"
        >          
          <div class="d-flex flex-column align-center pt-5">
            <v-text-field              
              variant="solo"
              rounded="xl"
              placeholder="Welche Datensätze suchen Sie?"
              hide-details
              clearable
              width="70%"    
              density="compact"
              prepend-inner-icon="mdi-magnify"  
              append-inner-icon="mdi-arrow-right-circle"                
            />

            <div class="d-flex mt-2">
              <v-btn
                class="mr-1 text-capitalize text-primary text-body-2"
                variant="outlined"
                rounded="xl"
                density="compact"
              >
                Rehabilitation
              </v-btn>
  
              <v-btn
                class="mr-1 text-capitalize text-primary text-body-2"
                variant="outlined"
                rounded="xl"
                density="compact"
              >
                Wetter
              </v-btn>
  
              <v-btn
                class="mr-1 text-capitalize text-primary text-body-2"
                variant="outlined"
                rounded="xl"
                density="compact"
              >
                Emissionen
              </v-btn>
  
              <v-btn
                class="mr-1 text-capitalize text-primary text-body-2"
                variant="outlined"
                rounded="xl"
                density="compact"
              >
                Sozialstruktur
              </v-btn>
  
              <v-btn
                class="mr-1 text-capitalize text-primary text-body-2"
                variant="outlined"
                rounded="xl"
                density="compact"
              >
                Alle Datensätze
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row 
        justify="center" 
        class="bg-home-surface"
      >
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="6"
        >
          <b class="pl-10 ml-10 text-h4">Daten sortieren und für MII-Daten anpassen</b>   
          <p class="pl-10 ml-10 text-body-1 mt-5">
            Mit unserer Webanwendung können Sie sofort passende offene Datensätze finden, die sich mit dem Kerndatensatz der Medizinformatikinitative verschneiden lassen, zum Beispiel über räumlichen oder zeitlichen Bezug oder über Altersgruppe und Geschlecht. Die Anwendung erlaubt ebenfalls eine Filterung nach Thema und bereitet die offenen Daten automatisch in einem kompatiblen Format vor – bereit für eine nahtlose Integration mit Ihren MII-Daten.
          </p>    
        </v-col>
      </v-row>  
      <v-row 
        justify="center" 
        class="bg-home-surface"
      >
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="6"
        > 
          <p class="pl-10 ml-10 font-weight-bold">Filtern nach MII-Schlüsselattribute</p>
          <AttributeCategories class="pl-10 ml-10" />
        </v-col>
      </v-row>          
    </v-container>

    <v-container
      class="bg-home-white"
    >
      <v-row justify="center">
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="6"
        > 
          <p class="pl-10 ml-10 text-h4 mt-10">Vier Datenwelten für umfassende Analysen</p>
          <p class="pl-10 ml-10 text-body-1 mt-5 mb-10">
            Erkunden Sie, wie Umweltbedingungen, lokale Gesundheitsressourcen, sozioökonomische Faktoren und demografische Merkmale das Leben und die Erholung von Long-COVID-Betroffenen beeinflussen. Filtern und sortieren Sie relevante Datensätze, um tiefere Einblicke zu gewinnen und fundierte Antworten auf Ihre Forschungsfragen zu finden.
          </p>        
        </v-col>
      </v-row> 
      <v-row class="mt-0 mr-10 ml-10">        
        <v-col 
          cols="6" 
          lg="6" 
          xl="6" 
          xxl="6"
        >
          <HomeDataWorld
            icon="mdi-web"
            title="Umwelt"
            subtitle="Wenn Luftqualität zur Gesundheitsfrage wird"
            description="Untersuche den Einfluss von Umweltfaktoren wie z.B. die Luftqualität auf Post-Covid-Verläufe. Gibt es zeitliche oder regionale Unterschiede? Sind bestimmte Personen- oder Altersgruppen stärker durch Umweltbelastungen gefährdet? Identifizieren Sie potenzielle Risikofaktoren."
          />
        </v-col>
        
        <v-col 
          cols="6" 
          lg="6" 
          xl="6" 
          xxl="6"
        >
          <HomeDataWorld
            icon="mdi-medication-outline"
            title="Gesundheit"
            subtitle="Reha-Angebote für ein starkes Comeback"
            description="Erkunden Sie die medizinische Versorgung in Deutschland. Welche und wie viele Reha- und Pflegeangebote stehen Post-Covid-Patienten in Ihrer Region zur Verfügung? Wie steht es um die Zugänglichkeit dieser Angebote für betroffene Patienten? Werfen Sie einen Blick auf die Gesundheits-Infrastruktur."
          />
        </v-col>
      </v-row>
    
      <v-row class="mt-0 mr-10 ml-10">
        <v-col 
          cols="6" 
          lg="6" 
          xl="6" 
          xxl="6"
        >
          <HomeDataWorld
            icon="mdi-account-group-outline"
            title="Gesellschaft"
            subtitle="Sozioökonomische Hürden im Blick"
            description="Analysieren Sie den Zusammenhang zwischen sozioökonomischen Faktoren wie z. B. Bildungsniveau oder durchschnittliches Einkommen und Post-Covid. Wie wirken sich unterschiedliche Lebenssituationen auf das Risiko einer Post-Covid-Erkrankung und die Chancen auf eine erfolgreiche Genesung aus? Stellen Sie Hypothesen auf."
          />
        </v-col>
        
        <v-col 
          cols="6" 
          lg="6" 
          xl="6" 
          xxl="6"
        >
          <HomeDataWorld
            icon="mdi-selection-ellipse"
            title="Demografie"
            subtitle="Jede Altersgruppe zählt: Gesundheit nach Maß"
            description="Erforschen Sie Muster in den medizinischen Daten anhand demografischer Einflussfaktoren wie Alter und Geschlecht. Welche Schlüsse lassen sich in Bezug auf Prävention sowie bedarfsorientierte Behandlung und Genesung von Post-Covid-Patienten ableiten? Identifizieren Sie Risikogruppen."
          />
        </v-col>
      </v-row>      
    </v-container>
  </div>
</template>

<script setup lang="ts">
import HomeDataWorld from '../components/HomeDataWorld.vue';
import AttributeCategories from "../components/AttributeCategories.vue";
</script>

<style scoped>
.banner-section {
  background-image: url("../assets/landing-page-image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;  
  color: white;
  text-align: left;
}

.banner-title {
  font-weight: normal;
  max-width: 650px;
}

.banner-subtitle {
  max-width: 650px;
}

.bg-home-surface {
  background-color: #EAEAF6;
}

.bg-home-white {
  background-color: #FFFFFF;
}

.remove-top-margin {
  margin-top: -64px !important;
}
.remove-left-right-margin {
  margin-left: -24px !important;
  margin-right: -24px !important;
}
</style>

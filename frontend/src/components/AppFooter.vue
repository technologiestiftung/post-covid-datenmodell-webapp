<template>  
  <v-container class="bg-secondary pl-10">
    <v-row>
      <v-col 
        cols="12" 
        lg="12" 
        xl="12" 
        xxl="6"
      >        
        <div class="d-flex flex-column">
          <span class="text-h5">Sie möchten Datensätze für unseren</span>
          <span class="text-h5">Metadatenkatalog vorschlagen?</span>
          
          <div class="d-flex align-center justify-space-between mt-5">
            <div>
              <span class="text-h5">Füllen Sie unser Formular aus!</span>
            </div>
            <div class="mr-10">
              <v-btn 
                variant="flat"
                rounded="xl" 
                size="small" 
                href="" 
                target="_blank"
                class="text-primary text-capitalize"
              > 
                Daten vorschlagen 
              </v-btn>
            </div>
          </div>
        </div>        
      </v-col>
    </v-row>
    <v-divider class="mt-5 mb-5" />
    <v-row class="d-flex flex-row flex-wrap">
      <!-- Project Links -->
      <v-col 
        cols="12"
        sm="6" 
        lg="3" 
        xl="4" 
        xxl="2"
      >
        <div>
          <v-list 
            density="compact" 
            class="bg-transparent pa-0"
          >
            <v-list-item
              v-for="(item, index) in footerLinksProject"
              :key="index"
              :href="item.link"
              class="px-1"    
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
    
      <!-- Contact Links -->
      <v-col 
        cols="12"
        sm="6" 
        lg="3" 
        xl="4" 
        xxl="2"
      >
        <div>
          <v-list 
            density="compact" 
            class="bg-transparent pa-0"
          >
            <v-list-item
              v-for="(item, index) in footerLinksKontakt"
              :key="index"
              :href="item.link"
              class="px-1"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
    </v-row>
    <v-divider class="mt-5 mb-5" />
    <v-row>
      <v-col 
        cols="12" 
        lg="12" 
        xl="12" 
        xxl="12"
      >
        <div class="d-flex align-center justify-space-between">
          <div>
            <v-btn 
              variant="text" 
              size="small" 
              href="" 
              target="_blank"
              class="text-capitalize"
            > 
              Impressum 
            </v-btn>
            <v-btn 
              variant="text" 
              size="small" 
              href="" 
              target="_blank"
              class="text-capitalize"
            > 
              Datenschutz 
            </v-btn>
          </div>

          <div class="mr-10">
            <span class="text-body-2">© {{ new Date().getFullYear() }} Technologiestiftung</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const footerLinksProject = [
  {
    title: 'Über dieses Projekt',
    link: '',
  },
  {
    title: 'Für Medizinforschende',
    link: '',
  },
  {
    title: 'Für datenhaltende Stellen',
    link: '',
  },
]

const footerLinksKontakt = [
  {
    title: 'Kontakt',
    link: '',
  },
  {
    title: 'Support',
    link: '',
  },
  {
    title: 'Barrierefreiheit',
    link: '',
  },
  {
    title: 'FAQ',
    link: '',
  },
]
</script>

<style scoped>
</style>

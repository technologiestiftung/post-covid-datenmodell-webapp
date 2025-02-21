<template>
  <v-app-bar :elevation="0">
    <v-container>
      <v-row justify="center">
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="7"
        >          
          <div class="d-flex align-center justify-space-between pt-3 pb-2">
            <div class="ml-2">
              <img
                src="../assets/header-logo.svg"
                height="60px"
                width="60px"
              > 
            </div>
            <div class="d-flex flex-wrap gap-2 align-center">
              <v-btn 
                variant="flat" 
                size="small" 
                class="text-primary text-capitalize"                    
              >
                Metadatenbank
              </v-btn>
              <v-btn 
                variant="flat" 
                size="small" 
                class="text-primary text-capitalize"
              >
                Daten vorschlagen
              </v-btn>
              <v-btn 
                variant="outlined"
                rounded="xl" 
                size="small" 
                class="text-primary text-capitalize"                    
              >
                Datensatz-Export
              </v-btn>                  
            </div>
          </div>
        </v-col>        
      </v-row>
    </v-container>         
  </v-app-bar>
</template>

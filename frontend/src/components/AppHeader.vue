<template>
  <v-app-bar :elevation="0">
    <v-container>
      <v-row justify="center">
        <v-col 
          cols="12" 
          lg="12" 
          xl="12" 
          xxl="12"
        >          
          <div class="d-flex align-center justify-space-between">
            <div class="ml-10">
              <img
                src="../assets/header-logo.svg"
                height="60px"
                width="60px"
              > 
            </div>
            <div class="mr-10">
              <v-btn 
                variant="flat" 
                size="small" 
                class="mr-1 text-primary text-capitalize"                    
              >
                Metadatenbank
              </v-btn>
              <v-btn 
                variant="flat" 
                size="small" 
                class="mr-1 text-primary text-capitalize"
              >
                Daten vorschlagen
              </v-btn>
              <v-btn 
                variant="outlined"
                rounded="xl" 
                size="small" 
                class="mr-1 text-primary text-capitalize"                    
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

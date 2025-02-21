<template>
  <v-app-bar :elevation="0">
    <v-container>
      <v-row justify="center">
        <v-col 
          cols="12" 
          lg="10" 
          xl="9" 
          xxl="6"
        >          
          <div class="d-flex align-center justify-space-between pt-2">
            <div class="ml-10">
              <img
                src="../assets/header-logo.svg"
                height="60px"
                width="60px"
              > 
            </div>
            <div class="ml-5 d-flex flex-wrap justify-center align-center">
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

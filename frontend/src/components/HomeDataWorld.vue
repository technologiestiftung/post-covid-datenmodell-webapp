<template>
  <v-container class="d-flex justify-center">
    <v-card class="custom-card">
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <div class="ma-2 pa-2">
              <img
                width="100%"
                style="max-width: 60px"
                :src="iconStr"
              >
            </div>
          </v-col>
          <v-col cols="9">
            <h3 class="text-h5 font-weight-bold">
              {{ title }}
            </h3>
            <p class="text-subtitle-1">
              {{ subtitle }}
            </p>

            <p class="text-body-2 mt-5">
              {{ description }}
            </p>
            <v-btn 
              class="text-capitalize bg-secondary mt-10" 
              rounded="xl"
              variant="flat"
            >
              passende Datensätze finden
              <v-icon 
                end 
                icon="mdi-arrow-right" 
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Import icons directly
import umweltIcon from '../assets/umwelt.png';
import gesundheitIcon from '../assets/gesundheit.png';
import gesellschaftIcon from '../assets/gesellschaft.png';
import demografieIcon from '../assets/demografie.png';

const props = defineProps<{
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}>();

const iconStr = computed(() => {
  const icons: { [key: string]: string } = {
    'umwelt': umweltIcon,
    'gesundheit': gesundheitIcon,
    'gesellschaft': gesellschaftIcon,
    'demografie': demografieIcon,
  };
  return icons[props.icon] || '';
});

</script>

<style scoped>
.custom-card {
  background-color: #f6f6fc;
  border-radius: 16px;
  padding: 10px;
  max-width: 700px;
  min-height: 400px;
  height: 100%;
  width: 100%;
}

</style>

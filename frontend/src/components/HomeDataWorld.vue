<template>
  <v-card
    rounded="xl"
    elevation="0"
    class="custom-card fill-height py-2 text-secondary"
  >
    <v-card-text class="d-flex flex-column fill-height">
      <v-row class="fill-height">
        <v-col cols="12" md="3" class="text-center">
          <div>
            <img width="100%" style="max-width: 60px" :src="iconStr" />
          </div>
        </v-col>
        <v-col cols="12" md="9" class="d-flex flex-column fill-height">
          <div>
            <h3 class="text-h4 font-weight-bold">
              {{ title }}
            </h3>
            <p class="text-h6 font-weight-light">
              {{ subtitle }}
            </p>
            <p class="text-body-2 mt-5">
              {{ description }}
            </p>
          </div>
          <v-spacer v-if="$vuetify.display.mdAndUp"></v-spacer>
          <div>
            <v-btn
              class="text-none bg-secondary mt-10"
              rounded="xl"
              variant="flat"
              :class="{
                'text-button': $vuetify.display.mdAndUp,
                'text-caption': $vuetify.display.smAndDown,
              }"
              @click="goToDataList"
            >
              passende Datensätze finden
              <v-icon end icon="mdi-arrow-right" />
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "@/types/metadata";

// Import icons directly
import umweltIcon from "../assets/umwelt.png";
import gesundheitIcon from "../assets/gesundheit.png";
import gesellschaftIcon from "../assets/gesellschaft.png";
import demografieIcon from "../assets/demografie.png";
import { useRouter } from "vue-router";
import { useFilterStore } from "@/stores/filters";

const router = useRouter();
const filterStore = useFilterStore();

const props = defineProps<{
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}>();

const iconStr = computed(() => {
  const icons: { [key: string]: string } = {
    umwelt: umweltIcon,
    gesundheit: gesundheitIcon,
    gesellschaft: gesellschaftIcon,
    demografie: demografieIcon,
  };
  return icons[props.icon] || "";
});

const goToDataList = () => {
  filterStore.filterCategory = props.title as Category;
  window.scrollTo(0, 0);
  router.push({ name: "DataList" });
};
</script>

<style scoped>
.custom-card {
  background-color: #eaeaf6;
}
</style>

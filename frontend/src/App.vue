<template>
  <v-app>
    <AppHeader></AppHeader>
    <v-main> <router-view /></v-main>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts" setup>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

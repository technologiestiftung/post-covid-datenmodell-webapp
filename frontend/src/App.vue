<template>
  <v-app>
    <AppHeader></AppHeader>
    <v-main style="background-color: #eaeaf6">
      <router-view />
    </v-main>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts" setup>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

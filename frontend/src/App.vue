<template>
  <v-app>
    <AppHeader />
    <AppErrorNotification />
    <WelcomeDialog />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppErrorNotification from "@/components/AppErrorNotification.vue";
import WelcomeDialog from "@/components/WelcomeDialog.vue";
</script>

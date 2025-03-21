<template>
  <v-snackbar
    v-model="notificationStore.isNotificationVisible"
    :timeout="notificationStore.timeout"
    app
    color="error"
  >
    {{ notificationStore.notification }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notifications";
const notificationStore = useNotificationStore();
</script>

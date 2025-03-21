import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<string[]>([]);
  const notification = ref<string | undefined>(undefined);
  const isNotificationVisible = ref(false);
  const timeout = ref(5500);
  const waittime = ref(500);
  const processing = ref(false);

  const deleteNotification = () => {
    notifications.value = notifications.value.slice(1);
    isNotificationVisible.value = false;

    if (notifications.value.length > 0) {
      notification.value = notifications.value[0];
      isNotificationVisible.value = true;
      setTimeout(deleteNotification, waittime.value + timeout.value);
    } else {
      processing.value = false;
    }
  };

  const addNotification = (message: string) => {
    notifications.value.push(message);
    notification.value = notifications.value[0];
    isNotificationVisible.value = true;

    if (!processing.value) {
      processing.value = true;
      setTimeout(deleteNotification, waittime.value + timeout.value);
    }
  };

  return {
    addNotification,
    isNotificationVisible,
    timeout,
    notification,
  };
});

<template>
  <div class="d-flex flex-column align-center">
    <p class="text-h4 pb-5">
      {{ title }}
    </p>   
    <div class="text-body-1  pb-5 home-text-container">
      {{ description }}
    </div>         
  </div>  
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.home-text-container {
  max-width: 800px;
  min-height: 100px;
  margin: 0 auto;
}
</style>

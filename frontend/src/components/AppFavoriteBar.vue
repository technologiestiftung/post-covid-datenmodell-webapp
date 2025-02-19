<template>
  <div class="favoriten-bar">
    <h1 class="favoriten-text">Favoriten</h1>
    <v-btn
      icon
      variant="outlined"
      density="compact"
      color="primary"
      @click="isSelected = !isSelected"
    >
      <v-icon size="16">
        {{ isSelected ? "mdi-star-outline" : "mdi-star" }}
      </v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.favoriten-bar {
  position: absolute;
  right: 0%; /* Adjust as needed */
  /* top: 0px%; */
  transform: translateY(-50%);
  background: #d5d5ec;
  padding: 15px 5px;
  /* border-radius: 10px 0 0 10px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  /* box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2); */
  z-index: 1000;
  gap: 10px;
  /* width: 50px; */
}

/* .favorite-btn {
  margin-bottom: 0px;
} */

.favoriten-text {
  font-size: 14px;
  color: #1e3791;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-align: center;
}
</style>

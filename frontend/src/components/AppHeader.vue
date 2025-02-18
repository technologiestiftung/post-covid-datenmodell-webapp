<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <img
        src="../assets/header-logo.svg"
        height="30px"
      ></img>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>
  </v-app-bar>
</template>

/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, type ThemeDefinition } from "vuetify";

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fbfbfd", // purple-white
    "background-dark": "#eaeaf6", // light-purple
    surface: "#ffffff", // pure white
    primary: "#1e3791", // light-blue
    secondary: "#0e1a45", // dark-blue
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme,
    },
  },
  defaults: {
    global: {
      font: {
        family: "Sora", // specify your font family here
      },
    },
  },
});

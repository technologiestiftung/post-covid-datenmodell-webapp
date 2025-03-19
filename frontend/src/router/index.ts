/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "DataList",
    path: "/data",
    component: () => import("@/pages/DataList.vue"),
  },
  {
    name: "DataExport",
    path: "/export",
    component: () => import("@/pages/DataExport.vue"),
  },
  {
    name: "DataSuggestion",
    path: "/suggest",
    component: () => import("@/pages/DataSuggestion.vue"),
  },
  {
    name: "DataSuggestionSuccess",
    path: "/suggest-success",
    component: () => import("@/pages/DataSuggestionSuccess.vue"),
  },
  {
    name: "ContactPage",
    path: "/contact",
    component: () => import("@/pages/ContactPage.vue"),
  },
  {
    name: "ContactPageSuccess",
    path: "/contact-success",
    component: () => import("@/pages/ContactPageSuccess.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

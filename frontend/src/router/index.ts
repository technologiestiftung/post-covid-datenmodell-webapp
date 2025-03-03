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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

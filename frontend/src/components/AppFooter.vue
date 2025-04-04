<template>
  <v-footer class="bg-secondary">
    <div style="width: 100vw" class="pa-4">
      <div class="d-flex flex-column">
        <span class="text-h5 text-md-h4"
          >Haben Sie Fragen zum Metadatenkatalog?
        </span>

        <div class="d-flex align-center justify-space-between mt-5 mb-5">
          <div class="mr-10">
            <v-btn
              variant="flat"
              rounded="xl"
              class="text-primary text-capitalize"
              :to="{ name: 'ContactPage' }"
            >
              Schreiben Sie uns
            </v-btn>
          </div>
        </div>
        <v-divider class="mt-5 mb-5" />
      </div>

      <div>
        <v-list density="compact" class="bg-transparent pa-0">
          <v-list-item
            v-for="(item, index) in footerLinksProject"
            :key="index"
            v-bind="
              item.link
                ? { href: item.link }
                : { to: { name: item.componentName } }
            "
            class="px-1"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <v-divider class="mt-5 mb-5" />

      <div class="d-flex align-center justify-space-between">
        <div>
          <v-btn
            variant="text"
            size="small"
            href="https://www.technologiestiftung-berlin.de/impressum"
            target="_blank"
            class="text-capitalize text-body-2 pl-0"
          >
            Impressum
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            href="https://www.technologiestiftung-berlin.de/datenschutz"
            target="_blank"
            class="text-capitalize text-body-2 pl-0"
          >
            Datenschutz
          </v-btn>
        </div>

        <div>
          <span class="text-body-2"
            >© {{ new Date().getFullYear() }} Technologiestiftung</span
          >
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const footerLinksProject = [
  {
    title: "Über dieses Projekt",
    link: " https://www.technologiestiftung-berlin.de/projekte/post-covid-datenmodell",
  },
  {
    title: "Kontakt",
    componentName: "ContactPage",
  },
  {
    title: "Daten beitragen",
    componentName: "DataSuggestion",
  },
  {
    title: "FAQ",
    componentName: "FAQ",
  },
];
</script>

<style scoped></style>

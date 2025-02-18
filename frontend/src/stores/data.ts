// Utilities
import { defineStore } from "pinia";

export const useDataStore = defineStore("app", () => {
  const testVariable = "test";
  const anotherTestVariable = "another test";

  return { testVariable, anotherTestVariable };
});

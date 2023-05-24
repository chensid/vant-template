import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
  }),
  getters: {},
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
  },
  persist: true,
});

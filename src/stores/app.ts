import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "counter",

  state: () => ({
    hello: "world",
  }),

  actions: {
    setHello(value: string) {
      this.hello = value;
    },
  },
});

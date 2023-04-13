import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import getUser from "@/api/getUser";

export const useUserStore = defineStore("user", () => {
  // state
  const user = ref<User | null>(null);

  // actions
  const loadUser = async (): Promise<boolean> => {
    if (user.value) return true;

    try {
      user.value = await getUser();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    user,
    loadUser,
  };
});

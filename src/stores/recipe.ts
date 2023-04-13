import { ref } from "vue";
import { defineStore } from "pinia";
import type { Recipe } from "@/types/recipe";
import getRecipes from "@/api/getRecipes";

export const useRecipeStore = defineStore("recipe", () => {
  // state
  const recipes = ref<Recipe[]>([]);

  // actions
  const loadRecipes = async (): Promise<boolean> => {
    if (recipes.value.length) return true;

    try {
      const recipesRes = await getRecipes();

      recipes.value = recipesRes;

      // unsuccessful if no recipes
      return recipesRes && recipesRes?.length > 0;
    } catch (err) {
      console.error(err);
      recipes.value = [];
      return false;
    }
  };

  return {
    recipes,
    loadRecipes,
  };
});

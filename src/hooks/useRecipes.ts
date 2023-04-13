import { computed, onMounted, ref } from "vue";
import type { Recipe } from "@/types/recipe";
import { useRecipeStore } from "@/stores/recipe";
import getUser from "@/api/getUser";
import { recipeToRecipeDisplay } from "@/utils/recipe";
import type { User } from "@/types/user";

interface RecipeFilters {
  query: string;
}

const filterRecipes = (recipes: Recipe[], filters: RecipeFilters): Recipe[] => {
  const { query } = filters;

  if (!query) return recipes;

  return recipes.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};

export const useRecipes = (initialFilter: RecipeFilters = { query: "" }) => {
  const store = useRecipeStore();
  const user = ref<User | null>(null);

  const filters = ref<RecipeFilters>(initialFilter);
  const isLoading = ref(false);
  const error = ref(false);

  const filteredRecipes = computed(() => {
    return filterRecipes(store.recipes, filters.value).map((recipe) =>
      recipeToRecipeDisplay(recipe, user.value)
    );
  });

  const loadRecipes = async () => {
    if (isLoading.value || store.recipes?.length) return;

    error.value = false;
    isLoading.value = true;

    user.value = await getUser();
    const success = await store.loadRecipes();

    error.value = !success;

    isLoading.value = false;
  };

  onMounted(loadRecipes);

  const searchRecipes = (searchParams: RecipeFilters) => {
    loadRecipes();

    filters.value = searchParams;
  };

  return {
    recipes: filteredRecipes,
    isLoading,
    error,
    searchRecipes,
  };
};

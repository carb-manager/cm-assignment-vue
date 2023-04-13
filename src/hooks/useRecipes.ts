import { computed, onMounted, ref } from "vue";
import type { Recipe } from "@/types/recipe";
import { useRecipeStore } from "@/stores/recipe";

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

  const filters = ref<RecipeFilters>(initialFilter);
  const isLoading = ref(false);
  const error = ref(false);

  const filteredRecipes = computed(() => {
    return filterRecipes(store.recipes, filters.value);
  });

  const loadRecipes = async () => {
    if (isLoading.value || store.recipes?.length) return;

    error.value = false;
    isLoading.value = true;

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

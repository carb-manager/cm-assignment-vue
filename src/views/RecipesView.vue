<template>
  <div class="recipes">
    <input
      placeholder="Search foods and servings&hellip;"
      class="search"
      type="text"
      v-model="searchValue"
    />
    <div v-for="(recipe, index) in recipesList" :key="index" class="list">
      <RecipeCard
        @click="goToSingleRecipe(recipe.id)"
        :recipe="recipe"
        :show-nutrient-labels="index === 0"
      />
    </div>

    <div v-if="error">
      Unable to load recipes.
      <span class="link-button" @click="retrySearch">Try again</span>.
    </div>

    <div v-if="isLoading">Loading recipes...</div>

    <div v-if="!isLoading && !error && searchValue && !recipesList.length">
      No recipes found.
      <span class="link-button" @click="searchValue = ''">Clear search</span>.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import RecipeCard from "@/components/RecipeCard.vue";
import { useRecipes } from "@/hooks/useRecipes";

export default defineComponent({
  components: {
    RecipeCard,
  },
  setup() {
    const {
      recipes: recipesList,
      isLoading,
      error,
      searchRecipes,
    } = useRecipes();

    const { push } = useRouter();

    const goToSingleRecipe = (id: number) => {
      push({
        name: "recipe",
        params: { id },
      });
    };

    const searchValue = ref("");

    watch(searchValue, (value) => {
      searchRecipes({ query: value });
    });

    const retrySearch = () => {
      searchRecipes({ query: searchValue.value });
    };

    return {
      isLoading,
      error,
      recipesList,
      searchValue,
      goToSingleRecipe,
      retrySearch,
    };
  },
});
</script>

<style lang="scss">
.recipes {
}

.search {
  border: 1px solid #ebebeb;
  padding: 16px 12px;
  border-radius: 30px;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  transition: all 0.15s ease-out;
  font-size: 16px;
  color: #282c37;

  &:focus {
    outline: none;
    border: 1px solid #1bc98e;
  }
}

.list {
  background: #fafbfc;
}

.link-button {
  cursor: pointer;
  color: rgb(17 24 39);
  font-weight: 500;
  text-decoration-line: underline;
}
.link-button:hover {
  color: rgb(59 130 246);
}
</style>

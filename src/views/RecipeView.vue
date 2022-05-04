<template>
  <div v-if="recipe">
    <h1>
      {{ recipe.name }}
    </h1>
    <img :src="recipe.image" :alt="recipe.name" />
    <p>rating: {{ recipe.rating }}/5</p>
    <p v-if="recipe.isPremium">Premium recipe</p>
    <ul>
      <li v-for="nutrient in recipe.nutrients" :key="nutrient.id">
        {{ nutrient.value }} {{ nutrient.unit }}
      </li>
    </ul>
  </div>
</template>

<script>
import getRecipe from "@/api/getRecipe";

export default {
  data: () => ({
    recipe: null,
  }),

  async mounted() {
    this.recipe = await getRecipe(this.$route.params.id);
  },
};
</script>

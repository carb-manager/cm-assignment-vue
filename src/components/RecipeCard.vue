<template>
  <div class="recipe-item">
    <div class="recipe-name">
      {{ recipe.name }}
    </div>
    <img class="recipeImage" :src="recipe.image" />
    <div class="nutrients">
      <template
        v-for="(nutrient, nutrientName) in recipe.nutrients"
        :key="nutrient.value"
      >
        <NutrientItem
          v-if="nutrient"
          :nutrient="nutrient"
          :nutrient-type="nutrientName"
          :show-label="showNutrientLabels"
        />
      </template>
    </div>
    <div class="tags">
      <div class="tag premium" v-if="recipe.isPremium">
        <img class="trophy" src="../assets/trophy.svg" />
        Premium
      </div>
      <div class="tag" v-for="tag in recipe.tags" :key="tag.key">
        {{ tag.display }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import NutrientItem from "@/components/NutrientItem.vue";
import type { RecipeDisplay } from "@/types/recipe";

export default defineComponent({
  components: {
    NutrientItem,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<RecipeDisplay>,
    },
    showNutrientLabels: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.recipe-name {
  position: absolute;
  top: 8px;
  left: 71px; // 8px margin + 55px image size + another 8px margin
  font-weight: 500;
}

.recipe-item {
  position: relative;
  color: #282c37;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 6px;
}

.recipeImage {
  position: relative;
  display: block;
  width: 55px;
  height: 55px;
  top: 8px;
  margin-left: 8px;
  border-radius: 4px;
}

.nutrients {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;

  > * {
    margin: 0 8px;
  }
}

.tags {
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 71px; // 8px margin + 55px image size + another 8px margin
  display: flex;

  .tag {
    display: block;
    background: #ebeff4;
    color: #6f7379;
    padding: 4px 8px;
    margin-right: 6px;
    border-radius: 12px;
    line-height: 1.2;
    font-weight: 500;

    &.premium {
      display: flex;

      .trophy {
        width: 12px;
        margin-right: 6px;
      }
    }
  }
}
</style>

<template>
  <div class="nutrient-item" :class="nutrienTypeToClassMap[nutrientType] || ''">
    <div class="nutrient-label" v-if="showLabel">
      {{ nutrientType }}
    </div>
    <span>
      {{ nutrient.display }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { NutrientDisplay, NutrientName } from "@/types/recipe";

const nutrienTypeToClassMap: { [key in NutrientName]: string } = {
  carbs: "carbs",
  proteins: "protein",
  fats: "fat",
  energy: "energy",
};

export default defineComponent({
  props: {
    nutrient: {
      required: true,
      type: Object as PropType<NutrientDisplay>,
    },
    nutrientType: {
      required: true,
      type: String as PropType<NutrientName>,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      nutrienTypeToClassMap,
    };
  },
});
</script>

<style scoped lang="scss">
.nutrient-item {
  text-align: right;
  min-width: 65px;
  font-weight: 500;
  color: #6f7379;

  .nutrient-label {
    font-size: 16px;
  }

  &.carbs span {
    color: #eb5350;
  }

  &.fat span {
    color: #ec9e31;
  }

  &.protein span {
    color: #3b77b1;
  }

  &.energy span {
    color: #282c37;
  }
}
</style>

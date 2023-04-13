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
          :name="showNutrientLabels ? 'Carbs' : null"
          :value="nutrient.value + 'g'"
          v-if="nutrient && nutrientName === 'carbs'"
          class="carbs"
        />
        <NutrientItem
          :name="showNutrientLabels ? 'Protein' : null"
          :value="nutrient.value + 'g'"
          v-if="nutrient && nutrientName === 'proteins'"
          class="protein"
        />
        <NutrientItem
          :name="showNutrientLabels ? 'Fat' : null"
          :value="nutrient.value + 'g'"
          v-if="nutrient && nutrientName === 'fats'"
          class="fat"
        />
        <NutrientItem
          v-if="nutrient && nutrientName === 'energy'"
          :name="
            showNutrientLabels
              ? getEnergy(nutrient.unit, nutrient.value).label
              : null
          "
          :value="round(getEnergy(nutrient.unit, nutrient.value).value)"
          class="energy"
        />
      </template>
    </div>
    <div class="tags">
      <div class="tag premium" v-if="recipe.isPremium">
        <img class="trophy" src="../assets/trophy.svg" />
        Premium
      </div>
      <div class="tag" v-for="tag in recipe.tags" :key="tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import type { PropType } from "vue";
import NutrientItem from "@/components/NutrientItem.vue";
import type { Recipe, Unit } from "@/types/recipe";
import type { User } from "@/types/user";

export default defineComponent({
  components: {
    NutrientItem,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<Recipe>,
    },
    showNutrientLabels: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    // TODO: we probably don't need the user here
    const user = ref<User | null>(null);

    const getEnergy = (recipeUnit: Unit, value: number) => {
      let label;

      if (recipeUnit !== user.value?.units.energy) {
        if (recipeUnit === "kilojoule") {
          label = "kCal";
          value = value / 4.184;
        } else {
          label = "kJ";
          value = value * 4.184;
        }
      } else {
        if (recipeUnit === "kilojoule") {
          label = "kJ";
        } else {
          label = "kCal";
        }
      }

      return {
        label,
        value,
      };
    };

    const round = (num: number, decimalPlaces = 2) => {
      const p = Math.pow(10, decimalPlaces);
      return Math.round(num * p) / p;
    };

    return {
      getEnergy,
      round,
    };
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

  .nutrient-item {
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

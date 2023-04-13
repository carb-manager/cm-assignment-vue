<template>
  <div class="recipes">
    <input
      placeholder="Search foods and servings&hellip;"
      class="search"
      type="text"
      @input="handleInput"
    />
    <div v-for="(recipe, index) in recipesList" :key="index" class="list">
      <div class="recipe-item" @click="goToSingleRecipe(recipe.id)">
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
              :name="index === 0 ? 'Carbs' : null"
              :value="nutrient.value + 'g'"
              v-if="nutrient && nutrientName === 'carbs'"
              class="carbs"
            />
            <NutrientItem
              :name="index === 0 ? 'Protein' : null"
              :value="nutrient.value + 'g'"
              v-if="nutrient && nutrientName === 'proteins'"
              class="protein"
            />
            <NutrientItem
              :name="index === 0 ? 'Fat' : null"
              :value="nutrient.value + 'g'"
              v-if="nutrient && nutrientName === 'fats'"
              class="fat"
            />
            <NutrientItem
              v-if="nutrient && nutrientName === 'energy'"
              :name="
                index === 0
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
    </div>

    <div v-if="error">Unable to load recipes</div>

    <div v-if="isLoading">Loading recipes...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NutrientItem from "@/components/NutrientItem.vue";
import getUser from "@/api/getUser";
import type { Unit } from "@/types/recipe";
import type { User } from "@/types/user";
import { useRecipes } from "@/hooks/useRecipes";

export default defineComponent({
  components: {
    NutrientItem,
  },
  setup() {
    const user = ref<User | null>(null);

    const {
      recipes: recipesList,
      isLoading,
      error,
      searchRecipes,
    } = useRecipes();

    onMounted(async () => {
      try {
        const userRes = await getUser();

        user.value = userRes;
      } catch (e) {
        console.error(e);
      }
    });

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

    const { push } = useRouter();

    const goToSingleRecipe = (id: number) => {
      push({
        name: "recipe",
        params: { id },
      });
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      searchRecipes({ query: value });
    };

    return {
      user,
      isLoading,
      error,
      recipesList,
      getEnergy,
      round,
      goToSingleRecipe,
      handleInput,
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

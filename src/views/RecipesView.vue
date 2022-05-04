<template>
  <div class="recipes">
    <template v-if="!error">
      <!-- TODO: Create a generic <SearchInput> component -->
      <input
        placeholder="Search foods and servings&hellip;"
        class="search"
        type="text"
        @input="filterRecipes($event.target.value)"
      />
      <!-- TODO: Add loading indicator -->
      <div v-for="(recipe, index) in recipesList" :key="index" class="list">
        <div class="recipe-item" @click="goToSingleRecipe(recipe.id)">
          <div class="recipe-name">
            {{ recipe.name }}
          </div>
          <img class="recipeImage" :src="recipe.image" />
          <div class="nutrients">
            <template
              v-for="({ value, unit }, nutrientName) in recipe.nutrients"
              :key="value"
            >
              <NutrientItem
                :name="index === 0 ? 'Carbs' : null"
                :value="value + 'g'"
                v-if="nutrientName === 'carbs'"
                class="carbs"
              />
              <NutrientItem
                :name="index === 0 ? 'Protein' : null"
                :value="value + 'g'"
                v-if="nutrientName === 'proteins'"
                class="protein"
              />
              <NutrientItem
                :name="index === 0 ? 'Fat' : null"
                :value="value + 'g'"
                v-if="nutrientName === 'fats'"
                class="fat"
              />
              <NutrientItem
                v-if="nutrientName === 'energy'"
                :name="index === 0 ? getEnergy(unit, value).label : null"
                :value="round(getEnergy(unit, value).value)"
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
    </template>
    <!-- FIXME: Why the error message flashes in initial load? -->
    <div v-if="!recipesList.length">Unable to load recipes</div>
  </div>
</template>

<script lang="js">
import NutrientItem from '@/components/NutrientItem.vue'
import getRecipes from '@/api/getRecipes'
import getUser from '@/api/getUser'

export default {
  components: {
    NutrientItem
  },

  data: () => ({
    isFiltered: false,
    recipes: [],
    filteredRecipes: [],
    user: {},
    error: false,
  }),

  async mounted () {
    try {
      const recipes = await getRecipes();
      const user = await getUser();

      this.recipes = recipes;
      this.user = user;

      if (!this.recipes.length) {
        this.error = true;
      }
    } catch (e) {
      console.error(e)
    }
  },

  computed: {
    recipesList() {
      return this.isFiltered ? this.filteredRecipes : this.recipes;
    },
  },

  methods: {
    getEnergy(recipeUnit, value) {
      let label;
      let val;

      if (recipeUnit !== this.user.units.energy) {
        if (recipeUnit === 'kilojoule') {
          label = 'kCal'
          val = value / 4.184;
        }
        else {
          label = 'kJ';
          val = value * 4.184;
        }
      }
      else {
        if (recipeUnit === 'kilojoule') {
          label = 'kJ'
          val = value;
        }
        else {
          label = 'kCal'
          val = value;
        }
      }

      return {
        label,
        value: val,
      };
    },

    round(num, decimalPlaces = 2) {
      const p = Math.pow(10, decimalPlaces);
      return Math.round(num * p) / p;
    },

    filterRecipes(value) {
      this.isFiltered = value !== '';

      // TODO: Make search results case-insensitive
      this.filteredRecipes = this.recipes.filter(({ name }) => name.includes(value))
    },

    goToSingleRecipe(id) {
      this.$router.push({
        name: 'recipe',
        params: { id }
      })
    }
  }
}
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

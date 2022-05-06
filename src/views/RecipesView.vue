<template>
  <div class="recipes">


    <template v-if="!error">

      <!--      generic search input-->
      <!--      emit the search value from the component-->
      <SearchInput
          @searching="filterRecipes"
      />

      <!--      loading indicator shown when loading data-->
      <div v-if="loading">
        Loading recipes...
      </div>


      <template v-else>
        <!--        display no search results-->
        <div v-if="isFiltered && noSearchResults">
          No search results
        </div>

        <div v-else v-for="(recipe, index) in recipesList" :key="index" class="list">
          <div class="recipe-item" @click="goToSingleRecipe(recipe.id)">
            <div class="recipe-name">
              {{ recipe.name }}
            </div>
            <img class="recipeImage" :src="recipe.image"/>
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
                <img class="trophy" src="../assets/trophy.svg"/>
                Premium
              </div>
              <div class="tag" v-for="tag in recipe.tags" :key="tag">
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </template>


    </template>

    <div v-if="error">
      Unable to load recipes

      <a href="#" @click="this.initData">Try again please</a>

    </div>
  </div>
</template>

<script lang="js">
import NutrientItem from '@/components/NutrientItem.vue'
import getUser from '@/api/getUser'
import SearchInput from "@/components/SearchInput.vue";

export default {
  components: {
    SearchInput,
    NutrientItem
  },

  data: () => ({
    isFiltered: false,
    loading: false,
    filteredRecipes: [],
    error: false,
  }),

  async mounted() {
    await this.initData();
  },
  computed: {
    recipes() {
      //fetching recipes from store
      return this.$store.state.recipes
    },

    user() {
      //fetching user from user
      return this.$store.state.user
    },

    recipesList() {
      return this.isFiltered ? this.filteredRecipes : this.recipes;
    },

    noSearchResults() {
      return this.filteredRecipes.length === 0;
    }
  },

  methods: {
    async initData() {
      try {
        //start loading recipes
        this.error = false
        this.loading = true

        //dispatch request to fetch recipes  user from the api
        await this.$store.dispatch('getRecipes')
        await this.$store.dispatch('getUser')

      } catch (e) {
        console.error(e)
        //sets the error to true if cannot load recipes
        this.error = true;
      } finally {
        //finish loading recipes
        this.loading = false;
      }
    },

    getEnergy(recipeUnit, value) {
      let label;
      let val;

      if (recipeUnit !== this.user.units.energy) {
        if (recipeUnit === 'kilojoule') {
          label = 'kCal'
          val = value / 4.184;
        } else {
          label = 'kJ';
          val = value * 4.184;
        }
      } else {
        if (recipeUnit === 'kilojoule') {
          label = 'kJ'
          val = value;
        } else {
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

      if (this.isFiltered) {
        //refactored this code to be case-insensitive
        this.filteredRecipes = this.recipes.filter(({name}) => name.toLowerCase().includes(value.toLowerCase()))
      }
    },

    goToSingleRecipe(id) {
      this.$router.push({
        name: 'recipe',
        params: {id}
      })
    }
  }
}
</script>

<style lang="scss">
.recipes {
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

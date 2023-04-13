import type {
  NutrientDisplay,
  NutrientName,
  Recipe,
  RecipeDisplay,
  Unit,
} from "@/types/recipe";
import type { User } from "@/types/user";

const nutrienUnitDisplayMap: { [key in Unit]: string } = {
  gram: "g",
  kilojoule: "kJ",
  kilocalorie: "kCal",
};

export const recipeToRecipeDisplay = (
  recipe: Recipe,
  user: User | null
): RecipeDisplay => {
  // TODO: localize tags for user
  const tags = recipe.tags.map((tag) => ({ key: tag, display: tag }));

  // TODO: localize nutrients for user
  const nutrients = (Object.keys(recipe.nutrients) as NutrientName[]).reduce(
    (acc, key) => {
      const nutrient = recipe.nutrients[key];

      if (nutrient) {
        let value = nutrient.value;
        let dispayValue = nutrient.value;
        let unit = nutrient.unit;

        // TODO: convert other units to user's preferred unit
        if (key === "energy") {
          const converted = getEnergy(
            nutrient.unit,
            nutrient.value,
            user?.units.energy || null
          );
          value = converted.value;
          unit = converted.unit;
          dispayValue = round(converted.value);
        }

        const label = nutrienUnitDisplayMap[unit] || "";
        const display = `${dispayValue} ${label}`;

        acc[key] = { value, unit, display };
      }

      return acc;
    },
    {} as Record<NutrientName, NutrientDisplay>
  );

  return {
    ...recipe,
    tags,
    nutrients,
  };
};

const getEnergy = (
  recipeUnit: Unit,
  value: number,
  convertUnit: Unit | null
) => {
  let unit = recipeUnit;

  if (recipeUnit === "kilojoule" && convertUnit === "kilocalorie") {
    value = value / 4.184;
    unit = "kilocalorie" as Unit;
  }

  if (recipeUnit === "kilocalorie" && convertUnit === "kilojoule") {
    value = value * 4.184;
    unit = "kilojoule" as Unit;
  }

  return {
    value,
    unit,
  };
};

const round = (num: number, decimalPlaces = 2) => {
  const p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
};

import type {
  Recipe,
  Nutrient,
  NutrientName,
  Unit,
} from "../../server/recipe/types";

export interface RecipeDisplay extends Omit<Recipe, "tags" | "nutrients"> {
  tags: { key: string; display: string }[];
  nutrients: Partial<Record<NutrientName, NutrientDisplay>>;
}

export interface NutrientDisplay extends Nutrient {
  display: string;
}

export { Recipe, Nutrient, NutrientName, Unit };

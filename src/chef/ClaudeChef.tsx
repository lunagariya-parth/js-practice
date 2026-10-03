import { useState } from "react";
import { generateRecipe } from "./recipe";
type TRecipe = {
  title: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  time: string;
};
export default function ClaudeChef() {
  const [ingredientsList, setIngredientsList] = useState<string[]>([
    "milk",
    "coco powder",
    "makhana",
    "chea seeds",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState<TRecipe | null>(null);
  function addIngredient(formData: FormData) {
    const ingredient = formData.get("ingredient");
    if (typeof ingredient !== "string" || !ingredient.trim()) return;
    setIngredientsList((prev) => [...prev, ingredient.trim()]);
  }
  async function cookRecipe(ingredientsList: string[], servings?: number) {
    setLoading(true);
    try {
      const recipe = await generateRecipe(ingredientsList, servings);
      setRecipe(recipe);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="space-y-2">
      <div>
        <form className="flex gap-2 w-full items-center" action={addIngredient}>
          <input name="ingredient" type="text" placeholder="add your ingredient" />
          <div className="flex gap-2">
            <button type="submit" disabled={loading}>
              Add Ingredient
            </button>
            <button disabled={loading} onClick={() => setIngredientsList([])}>
              Clear all Ingredients
            </button>
          </div>
        </form>
      </div>
      {ingredientsList.length > 0 && (
        <div className="border rounded p-2">
          <ul className="list-disc ps-4">
            {ingredientsList.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => cookRecipe(ingredientsList)} disabled={loading}>
          {loading ? "Molding Recipe..." : "Get Recipe"}
        </button>
        {recipe && <button onClick={() => setRecipe(null)}>Clear</button>}
      </div>
      {recipe && !error && (
        <div className="border rounded p-2 space-y-1.5">
          <h2>Recipe Name: {recipe.title}</h2>
          <p>Ingredients List:</p>
          {recipe.ingredients.length > 0 && (
            <div className="rounded p-2">
              <ol className="list-decimal ps-4">
                {recipe.ingredients.map((i) => (
                  <li key={i} className="text-wrap">
                    {i}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <p>Follow Steps:</p>
          {recipe.steps.length > 0 && (
            <div className="rounded p-2">
              <ol className="list-decimal ps-4">
                {recipe.steps.map((i) => (
                  <li key={i} className="text-wrap">
                    {i}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <p>Recipe take: {recipe.time}</p>
          <p>Serving easily {recipe.servings}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

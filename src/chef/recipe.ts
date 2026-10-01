import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);
const model_name = "meta-llama/Llama-3.1-8B-Instruct";
export async function generateRecipe(ingredients: string[], people?: number) {
  const res = await client.chatCompletion({
    model: model_name,
    messages: [
      {
        role: "system",
        content: `You are an experienced chef writing a recipe for a home cook. Reply ONLY with JSON: {"title": string, "servings": string, "ingredients": string[], "steps": string[], "time": string}. No markdown.
Rules:
- "servings": the number of people the recipe serves, e.g. "3 people".
- Scale all quantities for the number of people the user asks for. If the user gives no count, scale for 2 to 4 people.
- "ingredients": each item includes an exact quantity and any prep, e.g. "2 cloves garlic, finely minced".
- "steps": 6 to 10 steps. Each step is 2 to 3 full sentences covering what to do, how (technique, pan or tool, heat level, order of adding), how long, and a cue for when it is done (colour, texture, smell). Do not start steps with "Step 1". Never write vague steps like "Blend all ingredients" or "Serve chilled" on their own.
- Include prep steps (washing, chopping, soaking, measuring) and a final serving step with a tip.
- "time": total prep plus cook time, e.g. "25 minutes".`,
      },
      {
        role: "user",
        content: `Make a recipe using: ${ingredients.join(", ")}. ${
          people ? `Serves ${people} people.` : "No serving count given."
        }`,
      },
    ],
    max_tokens: 1800,
    temperature: 0.7,
  });

  const text = res.choices[0].message.content ?? "";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

// generateRecipe(["chicken", "rice", "garlic", "onion"])

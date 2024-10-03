import { useState, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const API_URL = "http://localhost:3000/recipes";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Process ingredients and instructions
    const ingredients = formData.ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const instructions = formData.instructions
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ingredients: ingredients.join("|"), // Join with a pipe for splitting later
          instructions: instructions.join("|"), // Join with a pipe for splitting later
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      console.log("Recipe created:", data);

      // Reset form
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        servings: "",
      });

      alert("Recipe added successfully!");
    } catch (error) {
      console.error("Error creating recipe:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Add New Recipe</CardTitle>
        <CardDescription>
          Fill out the form to add a new recipe. Separate ingredients with
          commas and write instructions as complete sentences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Recipe Title
            </label>
            <input
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              className="bg-[#f1f1f1] border border-black px-4 py-2 rounded-md"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="ingredients" className="text-sm font-medium">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List ingredients separated by commas"
              rows={4}
              className="bg-[#f1f1f1] border border-black px-4 py-2 rounded-md"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="instructions" className="text-sm font-medium">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter step-by-step instructions"
              rows={6}
              className="bg-[#f1f1f1] border border-black px-4 py-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="cookingTime" className="text-sm font-medium">
                Cooking Time (minutes)
              </label>
              <input
                id="cookingTime"
                type="number"
                value={formData.cookingTime}
                onChange={handleChange}
                placeholder="Cooking time"
                className="bg-[#f1f1f1] border border-black px-4 py-2 rounded-md"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="servings" className="text-sm font-medium">
                Servings
              </label>
              <input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={handleChange}
                placeholder="Servings"
                className="bg-[#f1f1f1] border border-black px-4 py-2 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Recipe"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

import { useState, useEffect } from "react";
import RecipeCard from "./components/recipeCard";
import "./index.css";

// Define the Recipe type based on your backend model
interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>My Recipe Collection</h1>
      </header>
      <main className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </main>
    </div>
  );
}

export default App;

"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  createdAt: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split ingredients and instructions by either pipe or newline
  const ingredientsList = recipe.ingredients
    .split(/[|\n]/)
    .filter((item) => item.trim());
  const instructionsList = recipe.instructions
    .split(/[|\n]/)
    .filter((item) => item.trim());

  console.log("Rendering RecipeCard with recipe:", recipe);

  return (
    <Card
      className={`w-full max-w-sm mx-auto transition-all duration-300 ease-in-out ${
        isExpanded ? "max-w-2xl" : ""
      }`}
    >
      <img
        src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={recipe.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Cooking Time: {recipe.cookingTime} mins
        </p>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {ingredientsList.map((item, index) => (
                <li key={index} className="pl-2">
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-outside text-sm space-y-2 ml-4">
              {instructionsList.map((step, index) => (
                <li key={index} className="pl-2">
                  {step.trim()}
                </li>
              ))}
            </ol>
          </div>
          <p className="text-sm">Servings: {recipe.servings}</p>
        </CardContent>
      )}
      <CardFooter>
        <Button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          {isExpanded ? "Hide Full Recipe" : "Show Full Recipe"}
        </Button>
      </CardFooter>
    </Card>
  );
}

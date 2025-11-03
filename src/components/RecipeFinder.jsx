import React, { useState } from "react";

const RecipeFinder = ({ localRecipes = [] }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchRecipe = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      const apiRecipes = data.meals && Array.isArray(data.meals) ? data.meals : [];

      // Match local recipes by name
      const userRecipes = localRecipes.filter((r) =>
        r.strMeal.toLowerCase().includes(query.toLowerCase())
      );

      const combined = [...userRecipes, ...apiRecipes];

      if (combined.length > 0) {
        setRecipes(combined);
      } else {
        setError("No recipes found. Try another name.");
      }
    } catch {
      setError("Something went wrong while fetching recipes.");
    }

    setLoading(false);
  };

  const getIngredients = (meal) => {
    if (meal.ingredients) return meal.ingredients;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure || ""}`);
      }
    }
    return ingredients;
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-6 text-green-700">
        🥗 Recipe Finder
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-96 sm:w-[500px] py-3 px-5 rounded-l-full border border-orange-300 
            text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 
            shadow-sm placeholder-gray-400"
        />
        <button
          onClick={() => searchRecipe(query)}
          className="bg-orange-500 text-white font-medium px-8 rounded-r-full 
            hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 
            transition-all duration-300 text-base shadow-sm"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading recipes...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {recipes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-44 object-cover rounded-lg mb-3"
              />

              <h2 className="text-lg font-semibold text-green-700 mb-1 text-center">
                {meal.strMeal}
              </h2>

              <div className="text-gray-600 mb-2 text-center text-xs">
                <p>
                  <strong>Category:</strong> {meal.strCategory || "N/A"}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea || "N/A"}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-2 mb-3">
                <p className="font-semibold text-green-800 text-sm mb-1">
                  🧂 Ingredients
                </p>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                  {getIngredients(meal).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-2 mb-3">
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  👨‍🍳 Instructions
                </p>
                <p className="text-xs text-gray-700 leading-snug">
                  {meal.strInstructions}
                </p>
              </div>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center text-green-600"
                >
                  ▶ Watch on YouTube
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;

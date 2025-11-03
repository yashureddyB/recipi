import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import MyCarousel from "./components/MyCarousel";
import Feedback from "./components/Feedback";
import RecipeFinder from "./components/RecipeFinder";
import AddRecipeForm from "./components/AddRecipeForm";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [localRecipes, setLocalRecipes] = useState([]);

  // Load recipes from localStorage on first load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myRecipes")) || [];
    setLocalRecipes(saved);
  }, []);

  // Save recipes whenever they change
  useEffect(() => {
    localStorage.setItem("myRecipes", JSON.stringify(localRecipes));
  }, [localRecipes]);

  // Add a new recipe (from AddRecipeForm)
  const handleAddRecipe = (newRecipe) => {
    setLocalRecipes([...localRecipes, newRecipe]);
  };

  return (
    <Router>
      <div className="app-container bg-gray-50 min-h-screen">
        <Header />

        <main className="flex flex-col items-center justify-center pt-10 space-y-6">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Body />
                  <MyCarousel />
                  <RecipeFinder localRecipes={localRecipes} />
                  <Feedback />
                </>
              }
            />

            {/* Add Recipe Route */}
            <Route
              path="/add"
              element={<AddRecipeForm onAddRecipe={handleAddRecipe} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

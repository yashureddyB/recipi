import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    area: "",
    ingredients: "",
    instructions: "",
    image: "",
    youtube: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      alert("Please fill in all required fields!");
      return;
    }

    const newRecipe = {
      idMeal: Date.now(),
      strMeal: formData.name,
      strCategory: formData.category,
      strArea: formData.area,
      strMealThumb: formData.image || "https://via.placeholder.com/300",
      strInstructions: formData.instructions,
      strYoutube: formData.youtube,
      ingredients: formData.ingredients.split(",").map((ing) => ing.trim()),
    };

    onAddRecipe(newRecipe);
    setFormData({
      name: "",
      category: "",
      area: "",
      ingredients: "",
      instructions: "",
      image: "",
      youtube: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mb-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        🥗 Add Your Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name *"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <input
            type="text"
            name="area"
            placeholder="Area (e.g., Indian, Italian)"
            value={formData.area}
            onChange={handleChange}
            className="p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated) *"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          rows="3"
        ></textarea>

        <textarea
          name="instructions"
          placeholder="Cooking Instructions *"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          rows="4"
        ></textarea>

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <input
          type="text"
          name="youtube"
          placeholder="YouTube Link (optional)"
          value={formData.youtube}
          onChange={handleChange}
          className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-200"
        >
          ➕ Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;

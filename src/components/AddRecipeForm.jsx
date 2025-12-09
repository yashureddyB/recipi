import React, { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    area: "",
    ingredients: "",
    instructions: "",
    image: "",
    youtube: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.ingredients || !formData.instructions) {
      alert("Please fill in all required fields!");
      return;
    }

    // Prepare data for backend
    const recipeData = {
      name: formData.name,
      category: formData.category,
      area: formData.area,
      ingredients: formData.ingredients, // backend expects comma-separated string
      instructions: formData.instructions,
      imageUrl: formData.image,
      youtubeUrl: formData.youtube,
    };

    try {
      const response = await fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      const result = await response.json();
      setMessage(`✅ Recipe created successfully! ID: ${result.id}`);

      // Reset form
      setFormData({
        name: "",
        category: "",
        area: "",
        ingredients: "",
        instructions: "",
        image: "",
        youtube: "",
      });
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mb-10 border border-gray-200 px-8 py-20">
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
          type="url"
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

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default AddRecipeForm;

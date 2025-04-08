"use strict"; 

// Import required modules
import logger from "../utils/logger.js"; // Logging utility for debugging
import JsonStore from "./json-store.js"; // Custom JSON storage handler

// Define the `recipesStore` module to manage stored recipes
const recipesStore = {
  // Initialize a new JSON store instance for recipes data
  store: new JsonStore("./models/recipes-store.json", {
    RecipesCollection: [], // Default empty collection if the file is empty
  }),

  // Define the key name for retrieving recipe data from the JSON file
  collection: "RecipesCollection",

  /**
   * Retrieves all recipes from the JSON store.
   * @returns {Array} - An array of all recipe objects.
   */
  getAllRecipes() {
    return this.store.findAll(this.collection);
  },

  /**
   * Finds and retrieves a single recipe by its unique ID.
   * @param {string} id - The ID of the recipe to find.
   * @returns {Object|null} - The recipe object if found, otherwise null.
   */
  getRecipe(id) {
    return this.store.findOneBy(this.collection, (recipe) => recipe.id === id);
  },
};

// Export `recipesStore` to be used in other parts of the application
export default recipesStore;

"use strict";

import logger from "../utils/logger.js";
import recipesStore from "../models/recipes-store.js";
import userStore from "../models/user-store.js";

const allowedAllergies = [
  "gluten", "crustaceans", "eggs", "fish", "peanuts", "soybeans", "milk",
  "nuts", "celery", "mustard", "sesame", "sulphites", "lupin", "molluscs"
];

const search = {
  showForm(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    response.render("search", {
      title: "Search Recipes",
      allowedAllergies,
      query: {}, // Initial empty form
      recipes: null,
      user: loggedInUser,
    });
  },

  execute(request, response) {
    const allRecipes = recipesStore.getAllRecipes();


    const query = {
      title: request.body.title?.toLowerCase() || "",
      vegeterian: request.body.vegeterian === "on",
      alergies: Array.isArray(request.body.alergies)
        ? request.body.alergies
        : request.body.alergies ? [request.body.alergies] : [],
    };

    const filtered = recipesStore.filterRecipes(query);


    response.render("search", {
      title: "Search Results",
      allowedAllergies,
      query,
      recipes: filtered,
    });
  },
};

export default search;

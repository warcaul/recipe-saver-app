"use strict";

import logger from "../utils/logger.js";
import recipesStore from "../models/recipes-store.js";
import userStore from "../models/user-store.js";

const recipe = {
  createView(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    const recipeID = request.params.id;
    const recipe = recipesStore.getRecipe(recipeID);

    const viewData = {
      title: "Recipe",
      singleRecipe: recipe,
      userHasLiked: recipe.likes && recipe.likes.includes(loggedInUser.id),
      user: loggedInUser,
    };

    response.render("recipe", viewData);
  },

  toggleLike(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    const recipeId = request.params.id;
    const recipe = recipesStore.getRecipe(recipeId);

    if (!loggedInUser || !recipe) return response.redirect("/catalogue");

    if (!recipe.likes) recipe.likes = [];

    const alreadyLiked = recipe.likes.includes(loggedInUser.id);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter((id) => id !== loggedInUser.id);
    } else {
      recipe.likes.push(loggedInUser.id);
    }

    recipe.rating = recipe.likes.length;
    recipesStore.updateRecipe(recipe);

    response.redirect("/recipe/" + recipeId);
  },
};

export default recipe;

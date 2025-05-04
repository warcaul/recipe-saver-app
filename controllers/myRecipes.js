"use strict";

import logger from "../utils/logger.js";
import recipeStore from "../models/recipes-store.js";
import { v4 as uuidv4 } from "uuid";
import userStore from "../models/user-store.js";
import cloudinaryStore from "../models/cloudinary-store.js";

const allowedAllergies = [
  "gluten",
  "crustaceans",
  "eggs",
  "fish",
  "peanuts",
  "soybeans",
  "milk",
  "nuts",
  "celery",
  "mustard",
  "sesame",
  "sulphites",
  "lupin",
  "molluscs",
];

const myrecipes = {
  createView(request, response) {
    logger.info("My recipes page rendering");
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const page = parseInt(request.query.page) || 1;
    const perPage = 5;

    const allRecipes = recipeStore.getUserRecipes(loggedInUser.id);
    const totalRecipes = allRecipes.length;
    const totalPages = Math.ceil(totalRecipes / perPage);

    const paginatedRecipes = allRecipes.slice(
      (page - 1) * perPage,
      page * perPage
    );

    const viewData = {
      title: "My Recipes Dashboard",
      recipes: paginatedRecipes,
      currentPage: page,
      totalPages: totalPages,
      user: loggedInUser,
    };

    logger.debug(
      `Rendering myrecipes page ${page} with ${paginatedRecipes.length} recipes`
    );
    response.render("myrecipes", viewData);
  },

  addForm(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const viewData = {
      title: "Add New Recipe",
      allowedAllergies,
      recipe: {},
      user: loggedInUser,
    };
    response.render("addRecipe", viewData);
  },

  editForm(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const recipeId = request.params.id;
    const recipe = recipeStore.getRecipe(recipeId);

    if (!recipe || recipe.userid !== loggedInUser.id) {
      return response.redirect("/myrecipes");
    }

    const viewData = {
      title: "Edit Recipe",
      recipe,
      allowedAllergies,
      user: loggedInUser,
    };
    response.render("editRecipe", viewData);
  },

  addRecipe: async function (request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const rawAllergies = request.body.alergies;
    const rawSteps = request.body.cookingSteps;

    if (request.files?.photo) {
      try {
        const photoUrl = await cloudinaryStore.uploadImage(
          request.files.photo,
          "recipes"
        );
        newRecipe.photo = photoUrl;
      } catch (err) {
        logger.error("Photo upload failed:", err);
      }
    }

    const newRecipe = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      description: request.body.description,
      alergies: Array.isArray(rawAllergies)
        ? rawAllergies
        : rawAllergies
        ? [rawAllergies]
        : [],
      vegeterian: request.body.vegeterian === "on",
      rating: 0,
      cookingSteps: Array.isArray(rawSteps)
        ? rawSteps.filter((step) => step.trim() !== "")
        : rawSteps
        ? [rawSteps]
        : [],
      date: new Date().toISOString(),
    };
    recipeStore.addRecipe(newRecipe);
    console.log("BODY:", request.body);
    response.redirect("/myrecipes");
  },

  deleteRecipe(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const recipeId = request.params.id;
    const recipe = recipeStore.getRecipe(recipeId);

    // Only allow deletion if recipe belongs to the current user
    if (recipe && recipe.userid === loggedInUser.id) {
      logger.debug(`Deleting Recipe ${recipeId}`);
      recipeStore.removeRecipe(recipeId);
    } else {
      logger.warn(`Unauthorized delete attempt for recipe ${recipeId}`);
    }

    response.redirect("/myrecipes");
  },

  updateRecipe: async function (request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    const recipeId = request.params.id;
    const recipe = recipeStore.getRecipe(recipeId);

    if (!recipe || recipe.userid !== loggedInUser.id) {
      return response.redirect("/myrecipes");
    }

    if (request.files?.photo) {
      try {
        const photoUrl = await cloudinaryStore.uploadImage(
          request.files.photo,
          "recipes"
        );
        recipe.photo = photoUrl;
      } catch (err) {
        logger.error("Photo upload failed:", err);
      }
    }

    const rawAllergies = request.body.alergies;
    const rawSteps = request.body.cookingSteps;

    // Update fields based on submitted form
    recipe.title = request.body.title;
    recipe.description = request.body.description;
    recipe.alergies = Array.isArray(rawAllergies)
      ? rawAllergies
      : rawAllergies
      ? [rawAllergies]
      : [];

    recipe.vegeterian = request.body.vegeterian === "on";

    recipe.cookingSteps = Array.isArray(rawSteps)
      ? rawSteps.filter((step) => step.trim() !== "")
      : rawSteps
      ? [rawSteps]
      : [];

    recipeStore.updateRecipe(recipe); // uses editCollection under the hood
    response.redirect(`/myrecipes/edit/${recipeId}`);
  },
};

export default myrecipes;

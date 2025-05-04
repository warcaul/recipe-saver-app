"use strict";

import logger from "../utils/logger.js";
import recipesStore from "../models/recipes-store.js";
import userStore from "../models/user-store.js";
import appStore from "../models/app-store.js";

const catalogue = {
  createView(request, response) {
    logger.info("Catalogue page loading!");
    const loggedInUser = userStore.getCurrentUser(request);

    const page = parseInt(request.query.page) || 1;
    const perPage = 5;
    const sortBy = request.query.sort || "date"; // по умолчанию — по дате

    let allRecipes = recipesStore.getAllRecipes();

    if (sortBy === "rating") {
      allRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "date") {
      allRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const totalRecipes = allRecipes.length;
    const totalPages = Math.ceil(totalRecipes / perPage);
    const paginatedRecipes = allRecipes.slice(
      (page - 1) * perPage,
      page * perPage
    );



    response.render("catalogue", {
      title: "Recipes Catalogue",
      recipes: paginatedRecipes,
      currentPage: page,
      totalPages,
      sortBy,
      user: loggedInUser,
    });
  },
};

export default catalogue;

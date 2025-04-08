"use strict"; 

// Importing logger utility for debugging and logging events
import logger from "../utils/logger.js";

// Importing `recipesStore` to fetch all available recipes
import recipesStore from "../models/recipes-store.js";

// Importing `appStore` to fetch application-related data (creator info)
import appStore from "../models/app-store.js";

/**
 * `catalogue` controller - Handles rendering of the Recipe Catalogue Page with pagination.
 */
const catalogue = {
  /**
   * Handles the creation of the Catalogue Page view with paginated recipes.
   * @param {Object} request - Express request object (contains client request data, including query parameters)
   * @param {Object} response - Express response object (used to send the rendered page)
   */
  createView(request, response) {
    logger.info("Catalogue page loading!");

    // Extract the current page from query parameters, defaulting to page 1
    const page = parseInt(request.query.page) || 1;

    // Number of recipes displayed per page
    const perPage = 5;

    // Fetch all recipes from the store
    const allRecipes = recipesStore.getAllRecipes();

    // Calculate total number of recipes and total pages
    const totalRecipes = allRecipes.length;
    const totalPages = Math.ceil(totalRecipes / perPage);

    // Calculate starting and ending index for pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;

    // Extract the specific slice of recipes for the current page
    const paginatedRecipes = allRecipes.slice(start, end);

    // Prepare the data to be sent to the Handlebars template (`catalogue.hbs`)
    const viewData = {
      title: "Recipes Catalogue", // Page title
      recipes: paginatedRecipes, // Paginated list of recipes
      info: appStore.getAppInfo(), // Retrieves application information from `appStore`
      currentPage: page, // Current page number
      totalPages: totalPages, // Total number of pages
    };

    // Log debug message showing which page is being displayed
    logger.debug(`Displaying page ${page} with ${paginatedRecipes.length} recipes.`);

    // Render the `catalogue` template and pass the view data
    response.render("catalogue", viewData);
  },
};

// Export `catalogue` controller so it can be used in routing
export default catalogue;

"use strict"; 


// Cyrently blank controller

// Import logger utility for debugging and logging events
import logger from "../utils/logger.js";

// Import `appStore` to fetch application-related data (title, creator info, statistics)
import appStore from "../models/app-store.js";

/**
 * `recipe` controller - Handles rendering of the Add Recipe Page.
 */
const recipe = {
  /**
   * Handles the creation of the Add Recipe Page view.
   * @param {Object} request - Express request object (contains client request data)
   * @param {Object} response - Express response object (used to send the rendered page)
   */
  createView(request, response) {
    // Log a debug message to indicate that the Add Recipe Page is loading
    logger.debug("Add Recipe page loading");

    // Prepare the data to be sent to the Handlebars template (`addRecipe.hbs`)
    const viewData = {
      title: "Add Recipe", // Page title
      info: appStore.getAppInfo(), // Retrieves application information from `appStore`
    };

    // Render the `addRecipe` template and pass the view data
    response.render("addRecipe", viewData);
  },
};

// Export `recipe` controller so it can be used in routing
export default recipe;

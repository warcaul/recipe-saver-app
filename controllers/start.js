"use strict"; 

// Importing the logger utility for debugging and tracking app events
import logger from "../utils/logger.js";

// Importing `appStore` to fetch application-related data (creator info,)
import appStore from "../models/app-store.js";

/**
 * `start` controller - Handles rendering of the Start Page
 */
const start = {
  /**
   * Handles the creation of the Start Page view
   * @param {Object} request - Express request object (contains client request data)
   * @param {Object} response - Express response object (used to send the rendered page)
   */
  createView(request, response) {
    // Logging an informational message to indicate that the Start Page is being loaded
    logger.info("Start page loading!");

    // Preparing the data to be sent to the Handlebars template (`start.hbs`)
    const viewData = {
      title: "Recipe Saver", // Page title
      info: appStore.getAppInfo(), // Retrieves application information from `appStore`
    };

    // Rendering the `start` template and passing the view data to the template
    response.render("start", viewData);
  },
};

// Export `start` controller so it can be used in routing
export default start;

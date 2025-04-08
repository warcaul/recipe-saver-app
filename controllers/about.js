"use strict"; 

// Import logger utility for debugging and logging events
import logger from "../utils/logger.js";

// Import `appStore` to fetch application-related data (title, creator info, statistics)
import appStore from "../models/app-store.js";

/**
 * `about` controller - Handles rendering of the About Page.
 */
const about = {
  /**
   * Handles the creation of the About Page view.
   * @param {Object} request - Express request object (contains client request data)
   * @param {Object} response - Express response object (used to send the rendered page)
   */
  createView(request, response) {
    // Log a debug message to indicate that the About Page is loading
    logger.debug("About page loading");

    // Prepare the data to be sent to the Handlebars template (`about.hbs`)
    const viewData = {
      title: "About", // Page title
      info: appStore.getAppInfo(), // Retrieves application information from `appStore`
    };

    // Render the `about` template and pass the view data
    response.render("about", viewData);
  },
};

// Export `about` controller so it can be used in routing
export default about;

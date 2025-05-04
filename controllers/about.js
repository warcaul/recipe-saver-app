"use strict"; 

import logger from "../utils/logger.js";
import userStore from "../models/user-store.js"
import appStore from "../models/app-store.js";


const about = {
    createView(request, response) {
    logger.debug("About page loading");
    const loggedInUser = userStore.getCurrentUser(request);
    

    // Prepare the data to be sent to the Handlebars template (`about.hbs`)
    const viewData = {
      title: "About", // Page title
      info: appStore.getAppInfo(), // Retrieves application information from `appStore`
      user : loggedInUser,
    };

    // Render the `about` template and pass the view data
    response.render("about", viewData);
  },
};

// Export `about` controller so it can be used in routing
export default about;

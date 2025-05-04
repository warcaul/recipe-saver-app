"use strict"; 

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import userStore from "../models/user-store.js";

const start = {

  createView(request, response) {
    logger.info("Start page loading!");
    const loggedInUser = userStore.getCurrentUser(request);
    
    const viewData = {
      title: "Recipe Saver", 
      info: appStore.getAppInfo(),
      user: loggedInUser,
    };

    response.render("start", viewData);
  },
};

export default start;

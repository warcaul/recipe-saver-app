'use strict';

import logger from '../utils/logger.js';
import recipesStore from '../models/recipes-store.js';
import appStore from "../models/app-store.js";

const recipe = {
  createView(request, response) {
    const recipeID = request.params.id;
    logger.debug('Recipe id = ' + recipeID);
    
    const viewData = {
      title: 'Recipe',
      info: appStore.getAppInfo(),
      singleRecipe: recipesStore.getRecipe(recipeID)
    };

    response.render('recipe', viewData);
  },
};

export default recipe;


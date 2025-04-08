'use strict';

// Import Express framework
import express from 'express';

// Import logger utility for debugging and tracking events
import logger from "./utils/logger.js";

// Create a new Express Router instance
const router = express.Router();

// Import Controllers (Each controller handles a specific page)
import start from './controllers/start.js'; // Handles the home page
import catalogue from './controllers/catalogue.js'; // Handles the recipe catalogue
import recipe from './controllers/recipe.js'; // Handles individual recipe pages
import addRecipe from './controllers/addRecipe.js'; // Handles adding new recipes
import about from './controllers/about.js'; // Handles the about page

// Define Routes
router.get('/', start.createView); // Home Page
router.get('/catalogue', catalogue.createView); // Recipe Catalogue Page
router.get('/recipe/:id', recipe.createView); // Individual Recipe Page (Dynamic ID)
router.get('/addRecipe', addRecipe.createView); // Add Recipe Page
router.get('/about', about.createView); // About Page

// Export the router to be used in server.js
export default router;

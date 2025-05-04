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
import about from './controllers/about.js'; // Handles the about page
import accounts from './controllers/accounts.js';
import myRecipes from './controllers/myRecipes.js'
import search from "./controllers/search.js";
import profileController from "./controllers/profile.js";


router.get('/start', start.createView);


router.get('/catalogue', catalogue.createView); 
router.get('/recipe/:id', recipe.createView); 
router.post("/recipe/:id/like", recipe.toggleLike);

router.get('/about', about.createView); 

router.get('/myrecipes', myRecipes.createView); 
router.get("/myrecipes/add", myRecipes.addForm);
router.post("/myrecipes/add", myRecipes.addRecipe);
router.get("/myrecipes/edit/:id", myRecipes.editForm);
router.post("/myrecipes/:id/update", myRecipes.updateRecipe);
router.get("/myrecipes/delete/:id", myRecipes.deleteRecipe);

router.get("/profile", profileController.index);
router.post("/profile/update", profileController.update);
router.post("/profile/delete", profileController.delete);


router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);



router.get("/search", search.showForm);
router.post("/search", search.execute);



router.get('/error', (request, response) => response.status(404).end('Page not found.'));


// Export the router to be used in server.js
export default router;

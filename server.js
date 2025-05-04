"use strict"; 

// Import required modules
import express from "express"; // Express framework for handling HTTP requests
import routes from "./routes.js"; // Import application routes
import logger from "./utils/logger.js"; // Logging utility for debugging
import helpers from "./utils/helpers.js"; // Import custom Handlebars helpers
import { create } from "express-handlebars"; // Import Handlebars template engine
import fileUpload from "express-fileupload";


import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


// Initialize Express application
const app = express();
const port = 3000; // Define the port where the server will run

// Serve static files from the 'public' directory (CSS, JS, images, etc.)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));


// Configure Handlebars with custom settings
const handlebars = create({ extname: ".hbs" }); // Use `.hbs` file extension instead of `.handlebars`
helpers(handlebars); // Register custom Handlebars helpers

// Set up Handlebars as the view engine
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// Use defined routes from `routes.js`
app.use("/", routes);

// Start the server and listen on the specified port
app.listen(port, () => logger.info(`Your app is listening on port ${port}`));

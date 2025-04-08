'use strict'; 

// Importing the Logger utility for debugging and tracking application logs
import logger from '../utils/logger.js';

// Importing JsonStore, a utility to handle JSON-based data storage
import JsonStore from './json-store.js';

// Defining the `appStore` module to manage application metadata
const appStore = {
  
  // Creating a new instance of `JsonStore` to load and manage `app-store.json`
  store: new JsonStore('./models/app-store.json', { info: {} }),

  // The main collection within `app-store.json` where data is stored
  collection: 'info',

  /**
   * Retrieves application information from `app-store.json`
   * @returns {Object} - The full `info` object from the JSON file
   */
  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

// Export `appStore` to be used in other parts of the application
export default appStore;

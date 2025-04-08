"use strict"; 

// Most of functions are copied from precious lab, but not used yet
// They will be used for next version of App, where all of data manipulaating moments will be added

// Importing LowDB modules for JSON-based database storage
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

/**
 * JsonStore - A wrapper around LowDB to handle JSON-based data storage.
 * This class provides methods to read, add, edit, and remove data from JSON files.
 */
class JsonStore {
  /**
   * Constructor - Initializes the LowDB database with a given file and default structure.
   * @param {string} file - The path to the JSON file.
   * @param {Object} defaults - The default structure for the database if the file is empty.
   */
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file), defaults);
    this.db.read(); // Reads existing data from the JSON file into memory
  }

  /**
   * Retrieves all data from a given collection.
   * @param {string} collection - The name of the collection to retrieve.
   * @returns {Array} - An array containing all objects in the specified collection.
   */
  findAll(collection) {
    return this.db.data[collection];
  }

  /**
   * Retrieves multiple items from a collection based on a filtering condition.
   * @param {string} collection - The collection to search in.
   * @param {Function} filter - A function that defines the filtering condition.
   * @returns {Array} - An array of matching items.
   */
  findBy(collection, filter) {
    return this.db.data[collection].filter(filter);
  }

  /**
   * Retrieves the first item from a collection that matches a filtering condition.
   * @param {string} collection - The collection to search in.
   * @param {Function} filter - A function that defines the filtering condition.
   * @returns {Object|null} - The first matching object, or `null` if none found.
   */
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Adds a new object to a collection.
   * @param {string} collection - The collection to add the object to.
   * @param {Object} obj - The object to add.
   * @returns {Promise<void>}
   */
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write(); // Writes changes to the JSON file
  }

  /**
   * Adds an item to a nested array within a collection.
   * @param {string} collection - The collection name.
   * @param {string} id - The ID of the parent object.
   * @param {string} arr - The key of the nested array.
   * @param {Object} obj - The item to add to the array.
   * @returns {Promise<void>}
   */
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].find((c) => c.id === id);
    if (data) {
      data[arr].push(obj);
      await this.db.write();
    }
  }

  /**
   * Removes an object from a collection.
   * @param {string} collection - The collection name.
   * @param {Object} obj - The object to remove.
   * @returns {Promise<void>}
   */
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
      await this.db.write();
    }
  }

  /**
   * Removes an item from a nested array within a collection.
   * @param {string} collection - The collection name.
   * @param {string} id - The ID of the parent object.
   * @param {string} arr - The key of the nested array.
   * @param {string} itemId - The ID of the item to remove.
   * @returns {Promise<void>}
   */
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].find((c) => c.id === id);
    if (data) {
      const index = data[arr].findIndex((i) => i.id === itemId);
      if (index > -1) {
        data[arr].splice(index, 1);
        await this.db.write();
      }
    }
  }

  /**
   * Edits (replaces) an entire object in a collection by ID.
   * @param {string} collection - The collection name.
   * @param {string} id - The ID of the object to replace.
   * @param {Object} obj - The new object.
   * @returns {Promise<void>}
   */
  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection][index] = obj;
      await this.db.write();
    }
  }

  /**
   * Edits (replaces) an item inside a nested array in a collection.
   * @param {string} collection - The collection name.
   * @param {string} id - The ID of the parent object.
   * @param {string} itemId - The ID of the item to replace.
   * @param {string} arr - The key of the nested array.
   * @param {Object} obj - The new object to replace the existing one.
   * @returns {Promise<void>}
   */
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].find((c) => c.id === id);
    if (data) {
      let index = data[arr].findIndex((i) => i.id === itemId);
      if (index > -1) {
        data[arr][index] = obj;
        await this.db.write();
      }
    }
  }
}

// Export `JsonStore` for use in other parts of the application
export default JsonStore;

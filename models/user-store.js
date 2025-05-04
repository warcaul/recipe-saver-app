"use strict";

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, (user) => user.id === id);
  },

  getUserByEmail(email) {
    return this.store.findOneBy(
      this.collection,
      (user) => user.email === email
    );
  },

  addUser(user) {
    this.store.addCollection(this.collection, user);
  },

  getUserByUsername(username) {
    return this.store.findOneBy(
      this.collection,
      (user) => user.username === username
    );
  },
  getCurrentUser(request) {
    const username = request.cookies.recipe;
    return userStore.getUserByUsername(username);
  },

  updateUser(updatedUser) {
    this.store.editCollection(this.collection, updatedUser.id, updatedUser);
  },

  removeUser(id) {
    this.store.removeItem(this.collection, id);
  },
};

export default userStore;

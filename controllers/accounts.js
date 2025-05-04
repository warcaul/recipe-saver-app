"use strict";

import logger from "../utils/logger.js";
import userStore from "../models/user-store.js";
import { v4 as uuidv4 } from "uuid";

//create an accounts object
const accounts = {
  //index function to render index page
  index(request, response) {
    // app statistics calculations

    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  //login function to render login page
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  //logout function to render logout page
  logout(request, response) {
    response.clearCookie("recipe");
    response.redirect("/");
  },

  //signup function to render signup page
  signup(request, response) {
    const { error, email, username, firstName, lastName } = request.query;
    const viewData = {
      title: "Register",
      error,
      email,
      username,
      firstName,
      lastName,
    };
    response.render("signup", viewData);
  },

  //register function to render the registration page for adding a new user
  register(request, response) {
    const user = request.body;

    const existingUser = userStore.getUserByUsername(user.username);
    const existingEmail = userStore.getUserByEmail(user.email);

    if (existingUser) {
      return response.redirect(
        `/signup?error=username&email=${encodeURIComponent(
          user.email
        )}&firstName=${encodeURIComponent(
          user.firstName
        )}&lastName=${encodeURIComponent(user.lastName)}`
      );
    }
    if (existingEmail) {
      return response.redirect(
        `/signup?error=email&username=${encodeURIComponent(
          user.username
        )}&firstName=${encodeURIComponent(
          user.firstName
        )}&lastName=${encodeURIComponent(user.lastName)}`
      );
    }

    user.id = uuidv4();
    userStore.addUser(user);
    response.cookie("recipe", user.username);
    response.redirect("/start");
  },

  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userStore.getUserByUsername(request.body.username);
    if (user && user.password === request.body.password) {
      response.cookie("recipe", user.username); // use username now
      logger.info("Logging in " + user.username);
      response.redirect("/start");
    } else {
      response.redirect("/login"); // optionally add error feedback
    }
  },


};

export default accounts;

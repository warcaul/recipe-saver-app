"use strict";

import logger from "../utils/logger.js";
import userStore from "../models/user-store.js";
import recipeStore from "../models/recipes-store.js";
import cloudinaryStore from "../models/cloudinary-store.js";

const profile = {
  index(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    const userRecipes = recipeStore.getUserRecipes(loggedInUser.id);

    let numRecipes = userRecipes.length;
    const averageRating = () => {
      if (userRecipes.length === 0) return 0; // avoid divide by zero
      let sum = 0;
      for (let i = 0; i < userRecipes.length; i++) {
        sum += userRecipes[i].rating || 0; // safeguard against undefined ratings
      }
      return (sum / userRecipes.length).toFixed(2); // rounding for display
    };

    const viewData = {
      title: "My Profile",
      user: loggedInUser,
      displayNumRecipes: numRecipes,
      displayAVGRating: averageRating(),
    };

    response.render("profile", viewData);
  },

  update: async function (request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    const { email, password } = request.body;

    loggedInUser.email = email?.trim() || loggedInUser.email;
    loggedInUser.firstName =
      request.body.firstName?.trim() || loggedInUser.firstName;
    loggedInUser.lastName =
      request.body.lastName?.trim() || loggedInUser.lastName;

    if (password && password.length >= 8) {
      loggedInUser.password = password;
    }

    if (request.files?.avatar) {
      try {
        const avatarUrl = await cloudinaryStore.uploadImage(
          request.files.avatar,
          "avatars"
        );
        loggedInUser.avatar = avatarUrl;
      } catch (err) {
        logger.error("Failed to upload avatar:", err);
      }
    }

    userStore.updateUser(loggedInUser);
    logger.info(`Updated profile for user ${loggedInUser.username}`);
    response.redirect("/profile");
  },

  delete(request, response) {
    const loggedInUser = userStore.getCurrentUser(request);
    if (!loggedInUser) return response.redirect("/login");

    userStore.removeUser(loggedInUser.id); // Удаляем пользователя
    response.clearCookie("recipe"); // Удаляем сессию
    logger.info(`User deleted: ${loggedInUser.email}`);
    response.redirect("/signup");
  },
};

export default profile;

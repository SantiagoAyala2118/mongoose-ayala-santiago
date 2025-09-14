import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidations = [
  body("profile_picture")
    .trim()
    .notEmpty()
    .withMessage("The profile_picture field cannot be empty")
    .isString()
    .withMessage("The profile_picture field must be a string"),
  body("biography")
    .trim()
    .notEmpty()
    .withMessage("The biography cannot be empty")
    .isString()
    .withMessage("The biography must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "The biography must contain at least 10 characters and a maximum of 100"
    ),
  body("owner")
    .trim()
    .notEmpty()
    .withMessage("The owner field cannot be empty")
    .isString()
    .withMessage("The owner field must be a string")
    .custom(async (owner) => {
      try {
        const user = await UserModel.findOne({ _id: owner });

        if (!user) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the ecistency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];

export const getProfileValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be greater than 0")
    .custom(async (id) => {
      try {
        const profile = await ProfileModel.findOne({ _id: id });

        if (!profile) {
          return Promise.reject("There is no profile in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the profile", err);
        return Promise.reject("Error checking the existency of the profile");
      }
    }),
];

export const updateProfileValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be greater than 0")
    .custom(async (id) => {
      try {
        const profile = await ProfileModel.findOne({ _id: id });

        if (!profile) {
          return Promise.reject("There is no profile in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the profile", err);
        return Promise.reject("Error checking the existency of the profile");
      }
    }),
  body("profile_picture")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The profile_picture field cannot be empty")
    .isString()
    .withMessage("The profile_picture field must be a string"),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The biography cannot be empty")
    .isString()
    .withMessage("The biography must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "The biography must contain at least 10 characters and a maximum of 100"
    ),
  body("owner")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The owner field cannot be empty")
    .isString()
    .withMessage("The owner field must be a string")
    .custom(async (owner) => {
      try {
        const user = await UserModel.findOne({ _id: owner });

        if (!user) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the ecistency of the user by id", err);
        return Promise.reject("Error checking the existency of the user by id");
      }
    }),
];

export const deleteProfileValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be greater than 0")
    .custom(async (id) => {
      try {
        const profile = await ProfileModel.findOne({ _id: id });

        if (!profile) {
          return Promise.reject("There is no profile in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the profile", err);
        return Promise.reject("Error checking the existency of the profile");
      }
    }),
];

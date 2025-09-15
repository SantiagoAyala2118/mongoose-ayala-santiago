import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { GroupModel } from "../../models/group.model.js";

export const createUserValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("The username cannot be empty")
    .isString()
    .withMessage("The username must be a string")
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "The username must contain at least 3 chatacters and a maximum of 40"
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("The email cannot be empty")
    .isEmail()
    .withMessage("The email format is invalid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          email: req.body.email,
        });

        if (emailExisting) {
          return Promise.reject(
            "There is already an user with that email, try another one"
          );
        }
      } catch (err) {
        console.error("Error checking the viability of the email", err);
        return Promise.reject("Error checking the viability of the email");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("The password must be a string"),
];

export const getUserValidations = [
  param("id").custom(async (id) => {
    try {
      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return Promise.reject("There is no user in the DB with that id");
      }
    } catch (err) {
      console.log("Error checking the existency of that user by id", err);
      return Promise.reject("Error checking the existency of that user by id");
    }
  }),
];

export const updateUserValidations = [
  param("id").custom(async (id) => {
    try {
      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return Promise.reject("There is no user in the DB with that ID");
      }
    } catch (err) {
      console.log("Error checking the existency of that user by id", err);
      return Promise.reject("Error checking the existency of that user by id");
    }
  }),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The username cannot be empty")
    .isString()
    .withMessage("The username must be a string")
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "The username must contain at least 3 chatacters and a maximum of 40"
    ),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The email cannot be empty")
    .isEmail()
    .withMessage("The email format is invalid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          email: req.body.email,
        });

        if (emailExisting) {
          return Promise.reject(
            "There is already an user with that email, try another one"
          );
        }
      } catch (err) {
        console.error("Error checking the viability of the email", err);
        return Promise.reject("Error checking the viability of the email");
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("The password must be a string"),
  body("groups")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The groups field cannot be empty")
    .custom(async (groups) => {
      try {
        const group = await GroupModel.findOne({ _id: groups });

        if (!group) {
          return Promise.reject("There is no group in the DB with that Id");
        }
      } catch (err) {
        console.error("Error checking the existency of that group by id", err);
        return Promise.reject(
          "Error checking the existency of that group by id"
        );
      }
    }),
];

export const deleteUserValidations = [
  param("id").custom(async (id) => {
    try {
      const user = await UserModel.findOne({ _id: id });

      if (!user) {
        return Promise.reject("There is no user in the DB with that id");
      }
    } catch (err) {
      console.log("Error checking the existency of that user by id", err);
      return Promise.reject("Error checking the existency of that user by id");
    }
  }),
];

import { body, param } from "express-validator";
import { GroupModel } from "../../models/group.model.js";
import { UserModel } from "../../models/user.model.js";

export const createGroupValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The name cannot be empty")
    .isString()
    .withMessage("The name must be a string")
    .custom(async (name, { req }) => {
      try {
        const name = await GroupModel.findOne({ name: req.body.name });
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
];

export const getGroupValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id) => {
      try {
        const group = await GroupModel.findById(id);

        if (!group) {
          return Promise.reject("There is no group in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the group", err);
        return Promise.reject("Error checking the existency of the group");
      }
    }),
];

export const updateGroupValidations = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The name cannot be empty")
    .isString()
    .withMessage("The name must be a string")
    .custom(async (name, { req }) => {
      try {
        const name = await GroupModel.findOne({ name: req.body.name });
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
  body("members")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The members field cannot be empty")
    .isString()
    .withMessage("The members field must be a string")
    .custom(async (members, { req }) => {
      try {
        const user = await UserModel.findOne({ _id: req.body.members });

        if (!user) {
          return Promise.reject("There is no user with that id in the DB");
        }
      } catch (err) {
        console.error("Error checking the existency of the user", err);
        return Promise.reject("Error checking the existency of the user");
      }
    }),
];

export const deleteGroupValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id) => {
      try {
        const group = await GroupModel.findById(id);

        if (!group) {
          return Promise.reject("There is no group in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the group", err);
        return Promise.reject("Error checking the existency of the group");
      }
    }),
];

import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { GroupModel } from "../../models/group.model.js";

export const createUserGroupValidations = [
  param("id")
    .trim()
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id) => {
      try {
        const user = await UserModel.findOne({ _id: id });

        if (!user) {
          return Promise.reject("There is no user with that id in the DB");
        }
      } catch (err) {
        console.error("Error checking the existency of the user", err);
        return Promise.reject("Error checking the existency of the user");
      }
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("The name cannot be empty")
    .isString()
    .withMessage("The name must be a string")
    .custom(async ({ req }) => {
      try {
        const group = await GroupModel.findOne({ name: req.body.name });

        if (!group) {
          return Promise.reject("There is no group with that name in the DB");
        }
      } catch (err) {
        console.error("Error checking the existency of the group", err);
        return Promise.reject("Error checking the existency of the group");
      }
    }),
];

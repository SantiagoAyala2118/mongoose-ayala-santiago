import { UserModel } from "../models/user.model.js";
import { GroupModel } from "../models/group.model.js";

export const createUserGroup = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    //AGREGO UN USUARIO A UN GRUPO
    const addUserToGroup = await GroupModel.findOneAndUpdate(
      { name: name },
      { $addToSet: { members: id } }
    );

    //REFERENCIO UN GRUPO CON UN USUARIO
    const refGroupToUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { groups: addUserToGroup._id } }
    );

    return res.status(201).json({
      ok: true,
      message: "Link added",
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

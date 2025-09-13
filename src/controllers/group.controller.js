import { GroupModel } from "../models/group.model.js";
import { UserModel } from "../models/user.model.js";

export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    //CREO UN GRUPO PRINCIPALMENTE SIN QUE ESTÉ ASOCIADO POR REFERENCIA A NINGUN USUARIO
    const newGroup = await GroupModel.create({
      name,
      members,
    });

    return res.status(201).json({
      ok: true,
      message: "Group created",
      Group: newGroup,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.find().populate("members", "-password");

    return res.status(200).json({
      ok: true,
      message: "Here are the groups",
      Groups: groups,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await GroupModel.findById(id).populate(
      "members",
      "-password"
    );

    return res.status(200).json({
      ok: true,
      message: "Here is the group",
      Group: group,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, members } = req.body;
  try {
    //ACTUALIZO EL GRUPO PRINCIPALMENTE PARA AÑADIR A LOS MIEMBROS
    const updatedGroup = await GroupModel.findByIdAndUpdate(
      id,
      {
        name,
        //FUNCION PARA AÑADIR ID'S DENTRO DEL ARREGLO QUE REFERENCIA A LOS USUARIOS
        $addToSet: { members: { $each: members } },
      },
      { new: true }
    );
    /*AUTOMATICAMENTE ACTUALIZO TODOS LOS DOCUMENTOS REFERENCIADOS EN EL CAMPO MEMBERS PARA QUE TAMBIEN ESTÉN 
    ASOCIADOS AL GRUPO*/
    await UserModel.updateMany(
      { _id: { $in: members } },
      { $addToSet: { groups: updatedGroup._id } }
    );

    return res.status(201).json({
      ok: true,
      message: "Group updated",
      Group: updatedGroup,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGroup = await GroupModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      message: "Group deleted",
      group_deleted: deletedGroup,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

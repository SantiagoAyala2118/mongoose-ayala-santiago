import { ProfileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  const { profile_picture, biography, owner } = req.body;
  try {
    const newProfile = await ProfileModel.create({
      profile_picture,
      biography,
      owner,
    });

    return res.status(201).json({
      ok: true,
      message: "Profile created",
      Profile: newProfile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate("owner", "-password");

    return res.status(200).json({
      ok: true,
      message: "Here are the profiles",
      Profiles: profiles,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileModel.findById(id).populate(
      "owner",
      "-password"
    );

    return res.status(200).json({
      ok: true,
      message: "Here is the profile",
      Profile: profile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { profile_picture, biography } = req.body;
  try {
    const updatedProfile = await ProfileModel.findByIdAndUpdate(
      id,
      {
        profile_picture,
        biography,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Profile updated",
      Profile: updatedProfile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProfile = await ProfileModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      message: "Profile deleted",
      profile_deleted: deletedProfile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

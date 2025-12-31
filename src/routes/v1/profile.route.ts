import express from "express";
import profileController from "../../controllers/profile.controller"
const router = express.Router();

// PROFILE routes

//create profile
router.route("/createProfile").post(profileController.createProfile);
//get all profles
router.route("/getProfiles").get(profileController.getProfiles);
//get single profile
router.route("/getProfile/:profileId").get(profileController.getProfileById);
//update profile
router.route("/updateProfile/:profileId").patch(profileController.updateProfile);
// softdeleted profile
router.route("/deleteProfile/:profileId").delete(profileController.deleteProfile);

export default router;
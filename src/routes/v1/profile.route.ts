import express from "express";
import profileController from "../../controllers/profile.controller"
const router = express.Router();
// PROFILE routes

//create profile
router.route("/createProfile").post(profileController.createProfile);
//get all active profiles
router.route("/getActiveProfiles").get(profileController.getActiveProfiles);
//get all inactive profiles
router.route("/getProfilesForAdmin").get(profileController.getProfilesForAdmin);
//get single profile
router.route("/getProfile/:id").get(profileController.getProfileById);
//get single profile for admin
router.route("/getProfileForAdmin/:id").get(profileController.getProfileByIdForAdmin);
//update profile
router.route("/updateProfile/:id").put(profileController.updateProfile);
// softdeleted profile
router.route("/deleteProfile/:id").delete(profileController.deleteProfile);
// restore profile
router.route("/restoreProfile/:id").patch(profileController.restoreProfile);

export default router;
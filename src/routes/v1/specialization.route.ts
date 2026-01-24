import express from "express";
import specializationController from "../../controllers/specialization.controller";
const router = express.Router();

// PROFILE routes

//create profile
router.route("/createSpecialization").post(specializationController.createSpecialization);
//get all active profiles
router.route("/getActiveSpecializations").get(specializationController.getActiveSpecializations);
//get all inactive profiles
router.route("/getSpecializationsForAdmin").get(specializationController.getSpecializationsForAdmin);
//get single profile
router.route("/getSpecialization/:id").get(specializationController.getSpecializationById);
//get single profile for admin
router.route("/getSpecializationForAdmin/:id").get(specializationController.getSpecializationByIdForAdmin);
//update profile
router.route("/updateSpecialization/:id").put(specializationController.updateSpecialization);
// softdeleted profile
router.route("/deleteSpecialization/:id").delete(specializationController.deleteSpecialization);
// restore profile
router.route("/restoreSpecialization/:id").patch(specializationController.restoreSpecialization);
export default router;
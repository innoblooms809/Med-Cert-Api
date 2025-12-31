import express from "express";
import specializationController from "../../controllers/specialization.controller";

const router = express.Router();
//craete specialization
router.route("/createSpecialization").post(specializationController.createSpecialization);
// get all specialization
router.route("/getSpecializations").get(specializationController.getSpecializations);
// get single specialization
router.route("/getSpecializationById/:specializationId").get(specializationController.getSpecializationById);
// update specialization
router.route("/updateSpecialization/:specializationId").patch(specializationController.updateSpecialization);
//soft delete
router.route("/deleteSpecialization/:specializationId").delete(specializationController.deleteSpecialization);

export default router;
  
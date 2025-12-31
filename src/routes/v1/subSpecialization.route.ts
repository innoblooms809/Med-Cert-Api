import express from "express";
import subSpecializationController from "../../controllers/subSpecialization.controller";

const router = express.Router();
//craete specialization
router.route("/createSubSpecialization").post(subSpecializationController.createSubSpecialization);
// get all specialization
router.route("/getSubSpecializations").get(subSpecializationController.getSubSpecializations);
// get single specialization
router.route("/getSubSpecializationById/:subSpecializationId").get(subSpecializationController.getSubSpecializationById);
// update specialization
router.route("/updateSubSpecialization/:subSpecializationId").patch(subSpecializationController.updateSubSpecialization);
//soft delete
router.route("/deleteSubSpecialization/:subSpecializationId").delete(subSpecializationController.deleteSubSpecialization);

export default router;

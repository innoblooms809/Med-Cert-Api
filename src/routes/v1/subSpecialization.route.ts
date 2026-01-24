import express from "express";
import subSpecializationController from "../../controllers/subSpecialization.controller";

const router = express.Router();
//create subSpecialization
router.route("/createSubSpecialization").post(subSpecializationController.createSubSpecialization);
//  Frontend: Get active sub-specializations by specializationId
// ?specializationId=1
router.route("/getActiveSubSpecializations").get(subSpecializationController.getActiveSubSpecializations);

// Admin: Get all sub-specializations (active + inactive)
router.route("/getSubSpecializationsForAdmin").get(subSpecializationController.getSubSpecializationsForAdmin);

//  Frontend: Get single active sub-specialization
router.route("/getSubSpecializationById/:id").get(subSpecializationController.getSubSpecializationById);
// Admin: Get single sub-specialization
router.route("/getSubSpecializationByIdForAdmin/:id").get(subSpecializationController.getSubSpecializationByIdForAdmin);

// update subSpecialization
router.route("/updateSubSpecialization/:id").put(subSpecializationController.updateSubSpecialization);
//soft delete
router.route("/deleteSubSpecialization/:id").delete(subSpecializationController.deleteSubSpecialization);

// Restore soft-deleted sub-specialization
router.route("/restoreSubSpecialization/:id").patch(subSpecializationController.restoreSubSpecialization);

export default router;

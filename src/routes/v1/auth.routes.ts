import express from "express";
// import masterController from '../../controllers/master.controller';
import { userController } from "../../controllers";
import { handleUploadFile } from "../../utils/uploadSingleFile";
import validate from "../../middlewares/validate";
import { user } from "../../validations";
import authenticate from "../../middlewares/auth";
 import authController from "../../controllers/auth/auth.controller";

const router = express.Router();
/**
 * PUBLIC AUTH ROUTES
 */

// Register user
router.route ("/register").post(handleUploadFile.single("licenseDoc"),authController.register);
router.route("/login").post(authController.login);

export default router;

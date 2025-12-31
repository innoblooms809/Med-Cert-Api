import express from "express";
// import masterController from '../../controllers/master.controller';
import { userController } from "../../controllers";
import { handleUploadFile } from "../../utils/uploadSingleFile";
import validate from "../../middlewares/validate";
import { user } from "../../validations";
import authenticate from "../../middlewares/auth";
import {simpleRegisterValidation } from "../../validations/auth.validation";

const router = express.Router();

router.route("/get-all").get(userController.getUser);

// router
//   .route("/register")
//   .post(
//     handleUploadFile.fields([{ name: "userPhoto" }, { name: "userSignature" }]),
//     userController.createUser
//   );
//  router.post("/register", validate(simpleRegisterValidation),  userController.createUser);

// router.route("/register").post(validate(user.userCreateValidation), userController.createUser);
  router.post(
  "/register",
  handleUploadFile.single("licenseDoc"), // ✅ single file
  userController.createUser
);

router.route('/getRoles').get(userController.getRole)
// router.route('/getProfiles').get(userController.getProfiles)
// router.route("/specializations/:profileId").get(userController.getSpecializationsByProfile);
// router.route("/sub-specializations/:specializationId").get(userController.getSubSpecializationsBySpecialization);


// router.get("/specializations/:profileId",userController.getSpecializationsByProfile);

router.route("/login").post(userController.loginUser);

router.route("/captcha").get(userController.getCaptcha);

router.route("/update/:userId").patch(userController.updateUser);
router.route("/get-user/:userId").get(userController.getSingleUser);

export default router;

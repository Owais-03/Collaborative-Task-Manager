import express from 'express';
import { register, signin, logout, updateProfile, forgetPassword, resetPassword } from '../controllers/user.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import singleUpload from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/signin").post(signin);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);

export default router;
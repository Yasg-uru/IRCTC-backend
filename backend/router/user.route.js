import express from "express";
import {
  authorization,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import {
  createuser,
  deleteuser,
  forgotpassword,
  getalluser,
  getdetail,
  getsingleuser,
  login,
  logout,
  resetpassword,
  updatepassword,
  updateuserprofile,
  updateuserrole,
  verifyAuth,
} from "../controller/user.controller.js";

const router = express.Router();
router.route("/register").post(createuser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticated, getdetail);

router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:token").post(resetpassword);
router.route("/updatepassword").put(isAuthenticated, updatepassword);
router
  .route("/getalluser")
  .get(isAuthenticated, authorization("admin"), getalluser);
router
  .route("/getsingleuser/:id")
  .get(isAuthenticated, authorization("admin"), getsingleuser);
router.route("/updateprofile").put(isAuthenticated, updateuserprofile);
router
  .route("/updaterole/:id")
  .put(isAuthenticated, authorization("admin"), updateuserrole);
router
  .route("/deleteuser/:id")
  .delete(isAuthenticated, authorization("admin"), deleteuser);
router.get("/check-auth", isAuthenticated, verifyAuth);

export default router;

const express = require("express");
const {
  login,
  protect,
  logout,
  signup,
  getUserAuth,
  updateUser,
  uploadUserPhoto,
} = require("../controllers/userController");
const router = express.Router();

router.route("/auth").post(login);
router.route("/protect").get(protect, getUserAuth);
router.route("/logout").get(logout);
router.route("/signup").post(signup);
router.route("/updateUser").put(uploadUserPhoto, protect, updateUser);

module.exports = router;

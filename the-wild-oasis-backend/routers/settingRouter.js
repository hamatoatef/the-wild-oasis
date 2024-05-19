const express = require("express");
const {
  getSettingController,
  editSettingController,
} = require("../controllers/settingController");

const router = express.Router();

router.route("/get-setting").get(getSettingController);
router.route("/update").patch(editSettingController);

module.exports = router;

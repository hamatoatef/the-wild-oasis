const express = require("express");
const {
  deleteAllGuestsController,
  createGuestsController,
  getGuestsIdController,
} = require("../controllers/guestController");

const router = express.Router();

router.route("/delete-guests").delete(deleteAllGuestsController);
router.route("/create-guests").post(createGuestsController);
router.route("/getGuestsId").get(getGuestsIdController);

module.exports = router;

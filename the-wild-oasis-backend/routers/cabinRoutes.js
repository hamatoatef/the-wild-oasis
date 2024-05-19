const express = require("express");

const {
  getCabinsController,
  deleteCabinsController,
  createCabinsController,
  uploadCabinPhoto,
  editCabinsController,
  deleteAllCabinsController,
  createAllCabins,
  getcabinsIdController,
} = require("../controllers/cabinController");

const router = express.Router();

router.route("/allCabins").post(createAllCabins);

router.route("/get-cabin").get(getCabinsController);

router.route("/delete-cabins").delete(deleteAllCabinsController);
router
  .route("/:id")
  .delete(deleteCabinsController)
  .put(uploadCabinPhoto, editCabinsController);

router.route("/").post(uploadCabinPhoto, createCabinsController);

router.route("/getCabinsId").get(getcabinsIdController);

module.exports = router;

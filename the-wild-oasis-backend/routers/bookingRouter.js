const express = require("express");
const {
  getAllBookingController,
  deleteAllBookingController,
  createBookingController,
  getBookingIdController,
  checkinController,
  deleteBookingController,
  getBookingAferDate,
  getStaysAferDate,
  bookingTodayActivityController,
} = require("../controllers/bookingController");

const router = express.Router();

router.route("/all-booking").get(getAllBookingController);
router.route("/delete-booking").delete(deleteAllBookingController);
router.route("/create-booking").post(createBookingController);
router.route("/checkin").post(checkinController);
router
  .route("/booking/:id")
  .get(getBookingIdController)
  .delete(deleteBookingController);

router.route("/today-activity").get(bookingTodayActivityController);
router.route("/bookingAfterDate/:days").get(getBookingAferDate);
router.route("/staysAfterDate/:days").get(getStaysAferDate);

module.exports = router;

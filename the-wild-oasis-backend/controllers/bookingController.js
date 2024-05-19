const {
  getAllBooking,
  deleteAllBooking,
  createAllBookings,
  getBookingID,
  checkin,
  deleteBooking,
  getBookingAfter,
  getStaysAfter,
  bookingTodayActivity,
} = require("../models/bookingModel");

exports.getAllBookingController = async (req, res) => {
  try {
    // EXECUTE QUERY

    // console.log(req.query);

    const bookings = await getAllBooking(req.query);

    res.status(200).json({
      status: "success",
      // length: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.deleteAllBookingController = async (req, res) => {
  try {
    const bookings = await deleteAllBooking();

    res.status(200).json({
      status: "success",
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.createBookingController = async (req, res) => {
  try {
    const bookings = req.body.bookings;

    if (!Array.isArray(bookings)) {
      throw new Error("Cabins must be an array");
    }

    const promises = bookings.map(async (booking) => {
      await createAllBookings(booking);
    });

    await Promise.all(promises);

    res.status(200).json({
      status: "success",
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data: from booking " + err,
    });
  }
};

exports.getBookingIdController = async (req, res) => {
  try {
    // console.log("reach here booking Id Controller");
    const { id } = req.params;

    const guests = await getBookingID(id);

    res.status(200).json({
      status: "success",
      data: guests,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.checkinController = async (req, res) => {
  try {
    await checkin(req.body);

    res.status(201).json({
      status: "success",
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.deleteBookingController = async (req, res) => {
  try {
    // EXECUTE QUERY
    const id = req.params.id;
    const cabins = await deleteBooking(id);

    res.status(200).json({
      status: "success",
      message: "deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data deleted" + err,
    });
  }
};

exports.getBookingAferDate = async (req, res) => {
  try {
    // console.log("reach here booking Id Controller");
    const { days } = req.params;

    const bookings = await getBookingAfter(days);

    res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.getStaysAferDate = async (req, res) => {
  try {
    // console.log("reach here booking Id Controller");
    const { days } = req.params;

    const stays = await getStaysAfter(days);

    res.status(200).json({
      status: "success",
      data: stays,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

exports.bookingTodayActivityController = async (req, res) => {
  try {
    // console.log("reach here booking Id Controller");

    const stays = await bookingTodayActivity();

    res.status(200).json({
      status: "success",
      data: stays,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

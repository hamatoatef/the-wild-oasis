const {
  deleteAllGuests,
  createAllGuests,
  getGuestsID,
} = require("../models/guestModal");

exports.deleteAllGuestsController = async (req, res) => {
  try {
    const guests = await deleteAllGuests();

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

exports.createGuestsController = async (req, res) => {
  try {
    const guests = req.body.guests;

    if (!Array.isArray(guests)) {
      throw new Error("Cabins must be an array");
    }

    const promises = guests.map(async (guest) => {
      await createAllGuests(guest);
    });

    await Promise.all(promises);

    res.status(200).json({
      status: "success",
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data: " + err,
    });
  }
};

exports.getGuestsIdController = async (req, res) => {
  try {
    const guests = await getGuestsID();

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

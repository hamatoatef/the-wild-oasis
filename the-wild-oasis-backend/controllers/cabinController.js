const multer = require("multer");

const {
  getCabins,
  deleteCabin,
  createCabin,
  editCabin,
  getCabin,
  deleteAllCabins,
  getCabinsID,
} = require("../models/cabinsModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/"); // Set the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Define the filename
  },
});

// Initialize the multer middleware with the storage option
const upload = multer({ storage: storage });

exports.uploadCabinPhoto = upload.single("image");

exports.getCabinsController = async (req, res) => {
  try {
    // EXECUTE QUERY

    const cabins = await getCabins();

    // console.log(cabins);

    res.status(200).json({
      status: "success",
      data: cabins,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + err,
    });
  }
};

exports.deleteCabinsController = async (req, res) => {
  try {
    // EXECUTE QUERY
    const id = req.params.id;
    const cabins = await deleteCabin(id);

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

exports.createCabinsController = async (req, res) => {
  try {
    // EXECUTE QUERY
    const data = req.body;
    if (req.file) data.photo = req.file.filename;
    const cabins = await createCabin(data);

    res.status(200).json({
      status: "success",
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data deleted" + err,
    });
  }
};

exports.editCabinsController = async (req, res) => {
  try {
    // EXECUTE QUERY
    const data = req.body;
    const id = req.params.id;

    if (req.file) data.photo = req.file.filename;
    // console.log(data);
    const cabins = await editCabin(data, id);

    res.status(200).json({
      status: "success",
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data deleted" + err,
    });
  }
};

exports.deleteAllCabinsController = async (req, res) => {
  try {
    console.log("deleteAllCabinsController");
    const bookings = await deleteAllCabins();

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

exports.createAllCabins = async (req, res) => {
  try {
    const cabins = req.body.cabins;

    if (!Array.isArray(cabins)) {
      throw new Error("Cabins must be an array");
    }

    const promises = cabins.map(async (cabin) => {
      if (req.file) cabin.photo = req.file.filename;
      await createCabin(cabin);
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

exports.getcabinsIdController = async (req, res) => {
  try {
    const cabins = await getCabinsID();

    res.status(200).json({
      status: "success",
      data: cabins,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + error,
    });
  }
};

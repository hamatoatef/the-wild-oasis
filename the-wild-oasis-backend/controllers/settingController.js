const { getSetting, editSetting } = require("../models/settingModel");

exports.getSettingController = async (req, res) => {
  try {
    // EXECUTE QUERY

    const setting = await getSetting();

    res.status(200).json({
      status: "success",
      data: setting,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent" + err,
    });
  }
};

exports.editSettingController = async (req, res) => {
  try {
    // EXECUTE QUERY
    const data = req.body;

    // console.log(data);

    const cabins = await editSetting(data);

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

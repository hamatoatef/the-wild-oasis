const {
  getUser,
  getUserById,
  createUser,
  editUser,
} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { log } = require("console");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/user/"); // Set the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Define the filename
  },
});

// Initialize the multer middleware with the storage option
const upload = multer({ storage: storage });

exports.uploadUserPhoto = upload.single("avatar");

const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREV,
  });
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const reqPassword = req.body.password;

    if (!email || !reqPassword) {
      throw new Error("please provide email and password ");
    }

    const user = await getUser(email);

    if (!user || !(await correctPassword(reqPassword, user.password))) {
      throw new Error("incorrect Email or Password ");
    }

    const token = signToken(user.user_id);

    const { id, password, ...rest } = user; // Destructure user object

    const newObj = { ...rest }; // Create a sanitized user object

    if (!req.session) {
      console.error("Session not available");
      return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
      });
    }

    // Securely store JWT and isAuth in session storage
    req.session.jwt = token;
    req.session.isAuth = true;
    req.session.save(function (err) {
      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({
          status: "fail",
          message: "Internal Server Error",
        });
      }

      // Send successful login response
      res.status(200).json({
        status: "success",
        data: {
          user: newObj,
          token, // Include the token in the response body
          isAuth: true,
        },
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid login " + error,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) getting token and check if it there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("you are not log in");
    }

    // 2) verfication token
    // promisify(jwt.verify) all this here is a function that we need to call which will return promise
    // (token,process.env.JWT_SECRET) then here we actually call the function
    // and this will return promises

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if user still exists

    const freshUser = await getUserById(decoded.id);
    if (!freshUser) throw new Error("user does no longer exist");

    req.user = freshUser;

    // grant access to protected route
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid token " + error,
    });
  }
};

exports.getUserAuth = async (req, res) => {
  // 1) getting token and check if it there
  try {
    freshUser = req.user;
    const { id, password, ...rest } = freshUser;

    const user = { ...rest };

    res.status(200).json({
      status: "success",
      data: {
        user,
        isAuth: true,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid user " + error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(); // Destroy the user's session
    res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({
      status: "fail",
      message: "Error logging out",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = req.body;

    // console.log(req.body);

    await createUser(user);

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

exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    freshUser = req.user;

    if (req.file) data.photo = req.file.filename;

    const { user_id } = freshUser;

    await editUser(data, user_id);

    await res.status(200).json({
      status: "success",
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid user " + error,
    });
  }
};

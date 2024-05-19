const express = require("express");
const session = require("express-session");

const cors = require("cors");
const dotenv = require("dotenv");
const cabinRouter = require("./routers/cabinRoutes");
const settingRouter = require("./routers/settingRouter");
const bookingRouter = require("./routers/bookingRouter");
const guestRouter = require("./routers/guestRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());

dotenv.config({ path: "./config.env" });

app.use(
  session({
    secret: "your_secret_key_here", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true for HTTPS
  })
);

app.use(express.static(`${__dirname}/public`));

// const CityRouter = require("./routes/citiesRouter");

// Allow all origins to access the resources (not recommended for production)
// this middleware for
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("hello from the server side :");
});

app.use("/api/v1/setting", settingRouter);
app.use("/api/v1/cabin", cabinRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/guest", guestRouter);
app.use("/api/v1/user", userRouter);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App runnning on port ${port}...`);
});

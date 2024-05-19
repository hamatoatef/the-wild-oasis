const fs = require("fs");
const dotenv = require("dotenv");
const City = require("./../models/citiesModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_NAME.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const cities = JSON.parse(fs.readFileSync(`${__dirname}/cities.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await City.create(cities);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await City.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

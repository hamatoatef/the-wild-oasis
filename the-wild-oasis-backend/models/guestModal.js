const pool = require("../pool");

exports.deleteAllGuests = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`delete from guests`);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.createAllGuests = async (newdata) => {
  // console.log(newdata)
  const { fullName, email, nationality, nationalID, countryFlag } = newdata;
  const client = await pool.connect();
  try {
    const text =
      "INSERT INTO guests (fullname, email, nationalid, nationality, countryflag ) VALUES ($1, $2, $3, $4, $5)";
    const values = [fullName, email, nationality, nationalID, countryFlag];

    const result = await client.query(text, values);
    // console.log("Data inserted successfully!");
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.getGuestsID = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`select id from guests order by id`);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

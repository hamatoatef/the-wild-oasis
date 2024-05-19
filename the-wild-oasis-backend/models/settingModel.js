const pool = require("../pool");

exports.getSetting = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`select * from settings `);
    return result.rows[0];
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

exports.editSetting = async (newSettign) => {
  const { field, value } = newSettign;

  const client = await pool.connect();
  try {
    const result = await client.query(
      `update settings  set ${field} = '${value}'  where id =1`
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const bcrypt = require("bcryptjs");

const pool = require("../pool");

exports.getUser = async (email) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select * from wild_user where email = '${email}'`
    );

    const user = result.rows[0];

    const imageURL = `http://localhost:3000/user/${user.avatar}`;
    // Return the cabin data with the image URL
    const resWithImgUrl = {
      ...user,
      avatar: imageURL,
    };

    return resWithImgUrl;
  } catch (error) {
    console.log("error" + error);
    console.log("there error in Get User Modal");
  } finally {
    client.release();
  }
};

exports.getUserById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select * from wild_user where user_id = ${id}`
    );

    const user = result.rows[0];

    const imageURL = `http://localhost:3000/user/${user.avatar}`;
    // Return the cabin data with the image URL
    const resWithImgUrl = {
      ...user,
      avatar: imageURL,
    };

    return resWithImgUrl;
  } catch (error) {
    console.log("error" + error);
    console.log("there error in Get User Modal");
  } finally {
    client.release();
  }
};

exports.createUser = async (user) => {
  const { fullName, email, password } = user;

  hashedPassword = await bcrypt.hash(password, 12);
  const client = await pool.connect();
  try {
    const text =
      "INSERT INTO wild_user (name, email, password ) VALUES ($1, $2, $3)";
    const values = [fullName, email, hashedPassword];

    const result = await client.query(text, values);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.editUser = async (newdata, id) => {
  const client = await pool.connect();
  const { fullName, photo, password } = newdata;

  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
      const result = await client.query(
        `update wild_user  set password = '${hashedPassword}'  where user_id =${id}`
      );
    } else {
      const image_cond = photo ? `, avatar = '${photo}'` : "";
      let password_cond = "";

      const result = await client.query(
        `update wild_user  set name = '${fullName}' ${image_cond}  where user_id =${id}`
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

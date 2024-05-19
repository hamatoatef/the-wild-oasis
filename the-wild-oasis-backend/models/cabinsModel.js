const pool = require("../pool");

const getCabins = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("select * from cabins");
    const cabins = result.rows;

    const cabinsWithImageURL = cabins.map((cabin) => {
      // Create the URL for the image
      const imageURL = `http://localhost:3000/img/${cabin.image}`;
      // Return the cabin data with the image URL
      return {
        ...cabin,
        image: imageURL,
      };
    });
    return cabinsWithImageURL;
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

const deleteCabin = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`delete from cabins where id =${id}`);
  } catch (error) {
    console.log("error" + error);
    console.log("there error in delete Cabin function");
  } finally {
    client.release();
  }
};

const createCabin = async (newdata) => {
  const { name, maxCapacity, regularPrice, discount, description, image } =
    newdata;
  const client = await pool.connect();

  // console.log(newdata);

  try {
    const text =
      "INSERT INTO cabins (name, maxcapacity, regularprice, discount, description , image) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    ];

    const result = await client.query(text, values);
    // console.log("Data inserted successfully!");
  } catch (error) {
    console.log("error " + error);
  } finally {
    client.release();
  }
};

const editCabin = async (newdata, id) => {
  const { name, maxCapacity, regularPrice, discount, description, photo } =
    newdata;

  const image_cond = photo ? `, image = '${photo}'` : "";

  const client = await pool.connect();
  try {
    const result = await client.query(
      `update cabins  set name = '${name}' ,maxcapacity='${maxCapacity}' ,regularprice='${regularPrice}' , discount='${discount}', description='${description}' ${image_cond}   where id =${id}`
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const getCabin = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`select * from cabins where id =${id}`);
    return result.rows;
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

const deleteAllCabins = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`delete from cabins`);
    return result;
  } catch (error) {
    console.log("error");
    throw error;
  } finally {
    client.release();
  }
};

const getCabinsID = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`select id from cabins order by id`);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getCabins,
  deleteCabin,
  createCabin,
  editCabin,
  getCabin,
  deleteAllCabins,
  getCabinsID,
};

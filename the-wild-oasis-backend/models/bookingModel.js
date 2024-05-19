const pool = require("../pool");
const QueryBuilder = require("../utils/apiFeatures");

exports.getAllBooking = async (filterParams = {}) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select b.id,	b.create_at,startdate,enddate,numnights,numguests,totalprice,status,g.fullname,	g.email ,	c.name 
       from	booking b 
       join cabins c on (b.cabinid = c.id)
       join guests g on  (g.id = b.guestid) 
       ${QueryBuilder.generateFilterQuery(filterParams)}
       ${QueryBuilder.generateSortQuery(filterParams)}`
    );

    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.deleteAllBooking = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`delete from booking`);
    return result;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.createAllBookings = async (newdata) => {
  const {
    created_at,
    startDate,
    endDate,
    cabinId,
    guestId,
    hasBreakfast,
    observations,
    isPaid,
    numGuests,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice,
    status,
  } = newdata;
  const client = await pool.connect();
  try {
    const text = `INSERT INTO booking (create_at, startdate, enddate, numnights, numguests, cabinprice, extrasprice, totalprice, status, hasbreakfast, ispaid, observations, cabinid, guestid)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

    const values = [
      created_at,
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      hasBreakfast,
      isPaid,
      observations,
      cabinId,
      guestId,
    ];

    const result = await client.query(text, values);
    // console.log("Data inserted successfully!");
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.getBookingID = async (id) => {
  const client = await pool.connect();
  try {
    const result =
      await client.query(`select b.startdate, b.enddate, b.numnights, b.numguests, b.cabinprice, b.extrasprice, b.totalprice,
    b.cabinid,   b.id,  b.hasbreakfast,   b.ispaid, b.status,    b.observations ,    c.create_at,    c.maxcapacity,c.regularprice,c.discount,
    c.name,    c.image,    c.description,    g.fullname,    g.email, g.nationalid, g.nationality,    g.countryflag
  from
    booking b
  join cabins c on
    (b.cabinid = c.id)
  join guests g on
    (g.id = b.guestid)
    where b.id = ${id}`);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.checkin = async (data) => {
  // Extract the id property from the object
  const { id, ...rest } = data;

  // Create a new object with the remaining properties
  const newObj = { ...rest };

  const client = await pool.connect();
  try {
    await client.query(
      `update booking set ${QueryBuilder.createQueryString(
        newObj
      )}  where id = ${id}`
    );
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

exports.deleteBooking = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`delete from booking where id =${id}`);
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

exports.getBookingAfter = async (days) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select create_at,totalprice, extrasprice  from booking b where create_at > current_date - interval '${days} day' `
    );

    return result.rows;
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

exports.getStaysAfter = async (days) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      ` select
      b.startdate,
      b.enddate,
      b.numnights,
      b.numguests,
      b.cabinprice,
      b.extrasprice,
      b.totalprice,
      b.cabinid,
      b.id,
      b.hasbreakfast,
      b.ispaid,
      b.status,
      b.observations ,
      g.fullname 
    from booking b join guests g ON
    (b.guestid = g.id )
    where 
    b.startdate > current_date - interval '${days} day'  `
    );

    return result.rows;
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

exports.bookingTodayActivity = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      ` select
      b.startdate,
      b.create_at ,
      b.enddate,
      b.numnights,
      b.numguests,
      b.cabinprice,
      b.extrasprice,
      b.totalprice,
      b.cabinid,
      b.id,
      b.hasbreakfast,
      b.ispaid,
      b.status,
      b.observations ,
      g.fullname ,
      g.nationality, 
      g.countryflag ,
      nationalid
      from booking b join guests g ON
      (b.guestid = g.id )
      where b.status in ('unconfirmed', 'checked-in')
      and (b.startdate = current_date or b.enddate = current_date) `
    );

    return result.rows;
  } catch (error) {
    console.log("error" + error);
  } finally {
    client.release();
  }
};

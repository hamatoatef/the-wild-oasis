const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://mato:admin@localhost:5432/the-wild-oasis",
});

module.exports = pool;

const { config } = require("dotenv");
const { Pool } = require("pg");
config();
const dbCredentials = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(dbCredentials);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

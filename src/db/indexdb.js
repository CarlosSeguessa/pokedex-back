const { config } = require("dotenv");
const { Pool } = require("pg");

const dbCredentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(dbCredentials);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

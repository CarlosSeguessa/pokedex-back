const auth = require("../pokedex-back/src/routes/auth");
const cors = require("cors");
const express = require("express");

const app = express();

const getPokemones = require("./src/routes/getPokemones");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", auth);
app.use("/api", getPokemones);

module.exports = app;

const express = require("express");
const { getPokemones } = require("../controllers/getPokemones");

const router = express.Router();

router.get("/pokemones", getPokemones);

module.exports = router;

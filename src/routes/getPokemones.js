const express = require("express");
const {
  getPokemones,
  getPokemonesById,
} = require("../controllers/getPokemones");

const router = express.Router();

router.get("/pokemones", getPokemones);
router.get("/pokemones/:id", getPokemonesById);

module.exports = router;

const express = require("express");
const {
  getPokemones,
  getPokemonesById,
  addPokemon,
} = require("../controllers/getPokemones");

const router = express.Router();

router.get("/pokemones", getPokemones);
router.get("/pokemones/:id", getPokemonesById);
router.post("/pokemones", addPokemon);

module.exports = router;

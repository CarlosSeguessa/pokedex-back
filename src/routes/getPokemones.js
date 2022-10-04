const express = require("express");
const { verifyToken } = require("../middleware/jw-validate");
const {
  getPokemones,
  getPokemonesById,
  addPokemon,
} = require("../controllers/getPokemones");

const router = express.Router();

router.get("/pokemones", verifyToken, getPokemones);
router.get("/pokemones/:id", getPokemonesById);
router.post("/pokemones", addPokemon);

module.exports = router;

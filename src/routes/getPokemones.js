const express = require("express");
const { verifyToken } = require("../middleware/jw-validate");
const {
  getPokemones,
  getPokemonesById,
  addPokemon,
} = require("../controllers/getPokemones");

const router = express.Router();

router.get("/pokemones", verifyToken, getPokemones);
router.get("/pokemones/:id", verifyToken, getPokemonesById);
router.post("/pokemones", verifyToken, addPokemon);

module.exports = router;

const db = require("../db/indexdb");

const getPokemones = async (req, res) => {
  try {
    const response =
      await db.query(`select p.*, s.hp, s.atk, s.def, s.satk, s.sdef, s.spd  from pokemones p
    join stats s on s.id_pokemon = p.id`);

    if (response.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "No hay pokemones",
      });
    }
    res.status(200).json({
      data: response.rows,
      success: true,
      message: "Pokemones listados correctamente",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getPokemones };

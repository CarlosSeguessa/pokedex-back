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

const getPokemonesById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.query(
      `select p.*, s.hp, s.atk, s.def, s.satk, s.sdef, s.spd  from pokemones p
    join stats s on s.id_pokemon = p.id where p.id = $1`,
      [id]
    );
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

const addPokemon = async (req, res) => {
  try {
    const {
      name,
      img,
      type1,
      type2,
      height,
      weight,
      moves,
      description,
      cardcolor,
      hp,
      atk,
      def,
      satk,
      sdef,
      spd,
    } = req.body;
    const response = await db.query(
      "insert into pokemones(name, img, type1, type2, height, weight, moves, description, cardcolor) values($1, $2, $3, $4, $5, $6, $7, $8, $9 ) returning *",
      [name, img, type1, type2, height, weight, moves, description, cardcolor]
    );
    const id_pokemon = response.rows[0].id;
    const responseStats = await db.query(
      "insert into stats(id_pokemon, hp, atk, def, satk, sdef, spd) values($1, $2, $3, $4, $5, $6, $7) returning *",
      [id_pokemon, hp, atk, def, satk, sdef, spd]
    );
    res.status(200).json({
      data: { ...response.rows[0], ...responseStats.rows[0] },
      success: true,
      message: "Pokemon creado correctamente",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getPokemones, getPokemonesById, addPokemon };

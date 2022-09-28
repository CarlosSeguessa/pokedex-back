const db = require("../db/indexdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middleware/jw-validate");

const registro = async (req, res) => {
  try {
    const { mail, name, password } = req.body;

    const user = await db.query("select * from users where mail = $1", [mail]);

    if (user.rowCount > 0) {
      return res.status(400).json({
        data: [],
        message: "Ya existe un usuario con ese correo",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      mail,
      password: passwordHashed,
    };

    await db.query(
      "insert into users(mail, name, password) values($1, $2, $3)",
      [mail, name, passwordHashed]
    );
    const token = jwt.sign(
      {
        name: user.rows[0].name,
        mail: mail,
      },
      TOKEN_SECRET
    );

    return res
      .status(200)
      .json({ data: [newUser], message: "Usuario creado", success: true });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await db.query("select * from users where mail = $1", [mail]);

    if (user.rowCount === 0) {
      return res.status(400).json({
        data: [],
        message: "Usuario desconocido",
        success: false,
      });
    }

    const contrasenhaValidada = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!contrasenhaValidada) {
      return res
        .status(400)
        .json({ success: false, message: "Password inválido" });
    }

    const token = jwt.sign(
      {
        name: user.rows[0].name,
        mail: mail,
      },
      TOKEN_SECRET
    );

    return res
      .status(200)
      .json({ success: true, message: "Log-in con exito", token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registro, login };

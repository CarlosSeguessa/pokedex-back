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
        message: "There is already a user with that email",
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

    return res
      .status(200)
      .json({ data: [newUser], message: "created user", success: true });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    console.log("Entro");
    const { mail, password } = req.body;

    const user = await db.query("select * from users where mail = $1", [mail]);

    if (user.rowCount === 0) {
      return res.status(400).json({
        data: [],
        message: "Unknown user",
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
        .json({ success: false, message: "Invalid password" });
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
      .json({ success: true, message: "Successful login", token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registro, login };

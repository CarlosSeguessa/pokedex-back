const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
config();
const TOKEN_SECRET = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token || token === "null") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const verified = jwt.verify(token, TOKEN_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { verifyToken, TOKEN_SECRET };

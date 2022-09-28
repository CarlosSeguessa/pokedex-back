const express = require("express");
const { verifyToken } = require("../middleware/jw-validate");

const router = express.Router();
const { registro, login } = require("../controllers/auth");

router.post("/registro", registro);

router.post("/login", login);

module.exports = router;

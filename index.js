const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App running in ${PORT}`));

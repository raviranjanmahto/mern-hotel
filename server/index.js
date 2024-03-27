require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./config/db");

const app = express();

connectDatabase();
const port = process.env.PORT || 7012;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

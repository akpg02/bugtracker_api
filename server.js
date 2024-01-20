require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(cors());

app.use("/auth", require("./Controller/Routes/auth"));

app.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});

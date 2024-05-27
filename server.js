const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync, read } = require("fs");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log("SOME ERROR OCCURED", err));

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://social-connect-frontend.onrender.com"],
  })
);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.listen(port, () => console.log(`server running on port ${port}`));

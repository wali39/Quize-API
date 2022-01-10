const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");
const url = process.env.DB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("db connected");
});

//middleware
app.set("view engine", "handlebars");
app.use(cors());
app.use(express.json());
app.use(routes); // routes middleware

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app started at port " + port);
});

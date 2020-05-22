const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const jsend = require("jsend");
const cors = require("cors");

const api = require("./routes");

// Database
const db = require("./config/database");

// TEST db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error" + err));

const app = express();

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api", api);

app.get("/", (req, res) => res.send("INDEX"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server on ${PORT}`));
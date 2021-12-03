// Main imports
const express = require("express");
const logger = require("morgan");
// DB conexion import
const { connect } = require("./app/config/database");
// Routes imports
const users = require("./app/api/routes/user.rotues");
const categories = require("./app/api/routes/categories.routes");
const albums = require("./app/api/routes/albums.routes");

// Other imports
const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const cors = require("cors");

// DB connection
connect();

const app = express();

// Headers definition
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Allowed PSI urls
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);

// JSON body format information
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan petitions especification
app.use(logger("dev"));

// Routes import definition
app.use("/users", users);
app.use("/categories", categories);
app.use("/albums", albums);

// Manage Error messages
app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = HTTPSTATUSCODE[404];
  next(err);
});

app.set("secretKey", "nodeRestApi"); // jwt secret token

// Handle errors
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error");
});

// Hides we are usnig Node
app.disable("x-powered-by");

// Server listening to port 3000
app.listen(3000, () => {
  console.log("Node server listening on port 3000");
});

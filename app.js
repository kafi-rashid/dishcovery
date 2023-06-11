require("./api/data/db.js");
const express = require("express");
const routes = require("./api/routes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", routes);

const server = app.listen(process.env.PORT, function() {
  console.log("Dishcovery running at http://localhost:" + server.address().port);
})
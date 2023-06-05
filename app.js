require("./api/data/db.js");
const express = require("express");
const routes = require("./api/routes");
const app = express();
const router = 
require("dotenv").config();

app.use(express.json());

app.use("/", routes);

const server = app.listen(process.env.PORT, function() {
  console.log("Dishcovery running at http://localhost:" + server.address().port);
})
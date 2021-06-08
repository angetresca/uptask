const express = require("express");
const routes = require("./routes");
const path = require("path");

// Create express app
const app = express();

// Port
app.listen(3000);

// Template engine: pug
app.set("view engine", "pug");

// Views
app.set("views", path.join(__dirname, "./views"));

// Routes
app.use("/", routes());
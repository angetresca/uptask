const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");

// DB connection
const db = require("./config/db");
 
require("./models/Projects");  // model import
 
db.sync()
    .then(()=> console.log("Conectado al server"))
    .catch(error => console.log(error))

// Create express app
const app = express();

// Static files
app.use(express.static("public"));

// Port
app.listen(3000);

// Template engine: pug
app.set("view engine", "pug");

// Views
app.set("views", path.join(__dirname, "./views"));

// Body parser to read form body
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use("/", routes());

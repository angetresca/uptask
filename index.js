const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
require("dotenv").config({ path: "variables.env" }); // env variables

// DB connection
const db = require("./config/db");

require("./models/Projects");  // model import
require("./models/Tasks");  // model import
require("./models/Users");  // model import

db.sync()
    .then(() => console.log("Conectado al server"))
    .catch(error => console.log(error))

// Create express app
const app = express();

// Body parser to read form body
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Template engine: pug
app.set("view engine", "pug");

// Views
app.set("views", path.join(__dirname, "./views"));

// flash messages 
app.use(flash());

app.use(cookieParser());

// sessions allows to navigate between pages without login again
app.use(session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false
}));

// auth
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    res.locals.user = { ...req.user } || null;
    next();
});

// Routes
app.use("/", routes());

// Host and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "3000";
app.listen(port, host, () => {
    console.log("El servidor está funcionando")
});

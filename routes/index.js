const express = require("express");
const router = express.Router();

// import controller
const projectController = require("../controllers/projectController");

module.exports = function() {
    // home route
    router.get("/", projectController.projectsHome  )

    router.get("/nosotros", projectController.us)

    return router;
}


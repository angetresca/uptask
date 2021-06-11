const express = require("express");
const router = express.Router();

// import controller
const projectController = require("../controllers/projectController");

// import express validator
const {body} = require("express-validator/check");

module.exports = function() {
    // home route
    router.get("/", projectController.projectsHome)
    router.get("/new-project", projectController.newProjectForm)

    router.post("/new-project", 
        body("name").not().isEmpty().trim().escape(), 
        projectController.newProject
    );

    // Projects routes
    router.get("/projects/:url", projectController.projectByUrl);

    // Edit project
    router.get("/project/edit/:id", projectController.editProjectForm);
    router.post("/new-project/:id", 
        body("name").not().isEmpty().trim().escape(), 
        projectController.editProject
    );


    return router;
}


const express = require("express");
const router = express.Router();

// import controller
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const usersController = require("../controllers/usersController");

// import express validator
const { body } = require("express-validator");

module.exports = function () {
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

    // Delete project
    router.delete("/projects/:url", projectController.deleteProject);

    // Create new task
    router.post("/projects/:url",
        body("task").not().isEmpty().trim().escape(),
        taskController.newTask
    );
    // Change task state
    router.patch("/tasks/:id", taskController.changeTaskState)

    // Delete task
    router.delete("/tasks/:id", taskController.deleteTask)

    // create new account
    router.get("/new-account", usersController.formNewAccount);
    router.post("/new-account", usersController.newAccount);

    // login
    router.get("/login", usersController.formLogin);
    router.post("/login", usersController.login);



    return router;
}


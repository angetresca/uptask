const express = require("express");
const router = express.Router();

// import controller
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

// import express validator
const { body } = require("express-validator");

module.exports = function () {
    // home route
    router.get("/", 
        authController.userAuthenticated,
        projectController.projectsHome
    )
    router.get("/new-project",
        authController.userAuthenticated,
        projectController.newProjectForm
     )

    router.post("/new-project",
        authController.userAuthenticated,
        body("name").not().isEmpty().trim().escape(),
        projectController.newProject
    );

    // Projects routes
    router.get("/projects/:url", 
        authController.userAuthenticated,
        projectController.projectByUrl)
    ;

    // Edit project
    router.get("/project/edit/:id", 
        authController.userAuthenticated,
        projectController.editProjectForm
    );
    router.post("/new-project/:id",
        authController.userAuthenticated,
        body("name").not().isEmpty().trim().escape(),
        projectController.editProject
    );

    // Delete project
    router.delete("/projects/:url", 
        authController.userAuthenticated, 
        projectController.deleteProject
    );

    // Create new task
    router.post("/projects/:url",
        authController.userAuthenticated,
        body("task").not().isEmpty().trim().escape(),
        taskController.newTask
    );
    // Change task state
    router.patch("/tasks/:id", 
        authController.userAuthenticated,
        taskController.changeTaskState
    )

    // Delete task
    router.delete("/tasks/:id", 
        authController.userAuthenticated, 
        taskController.deleteTask
    )

    // create new account
    router.get("/new-account", usersController.formNewAccount);
    router.post("/new-account", usersController.newAccount);

    // login
    router.get("/login", usersController.formLogin);
    router.post("/login", authController.authenticateUser);

    // logout
    router.get("/logout", authController.logout);

    return router;
}


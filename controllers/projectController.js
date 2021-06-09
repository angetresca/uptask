const Projects = require("../models/Projects");

exports.projectsHome = async (request, response) => {
    const projects = await Projects.findAll();

    response.render("index", {
        pageName: "Proyectos",
        projects
    });
}

exports.newProjectForm = (req, res) => {
    res.render("newProject", {
        pageName: "Nuevo proyecto"
    });
}

exports.newProject = async (req, res) => {
    // console.log(request.body); prints in node console

    // validate that data was sent
    const { name } = req.body;

    let errors = [];
    
    if (!name) {
        errors.push({"text": "Agrega un nombre al proyecto."});
    }

    if (errors.length > 0) {
        res.render("newProject", {
            pageName: "Nuevo proyecto",
            errors
        });
    } else {
        const project = await Projects.create({ name });
        res.redirect("/");
    }

}
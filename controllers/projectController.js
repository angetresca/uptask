const Projects = require("../models/Projects");

exports.projectsHome = (request, response) => {
    response.render("index", {
        pageName: "Proyectos"
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
        // TODO: insert in database
        const project = await Projects.create({ name });
        res.redirect("/");
    }

}
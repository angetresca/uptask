const Projects = require("../models/Projects");

exports.projectsHome = async (request, response) => {
    const projects = await Projects.findAll();

    response.render("index", {
        pageName: "Proyectos",
        projects
    });
}

exports.newProjectForm = async (req, res) => {
    const projects = await Projects.findAll();
    res.render("newProject", {
        pageName: "Nuevo proyecto",
        projects
    });
}

exports.newProject = async (req, res) => {
    // console.log(request.body); prints in node console
    const projects = await Projects.findAll();

    // validate that data was sent
    const { name } = req.body;

    let errors = [];
    
    if (!name) {
        errors.push({"text": "Agrega un nombre al proyecto."});
    }

    if (errors.length > 0) {
        res.render("newProject", {
            pageName: "Nuevo proyecto",
            errors,
            projects
        });
    } else {
        const project = await Projects.create({ name });
        res.redirect("/");
    }

}

exports.projectByUrl = async (req, res) => {
    const projectsPromise = Projects.findAll();

    const projectPromise = Projects.findOne({
        where: {
            url: req.params.url
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    if (!project) return next();

    res.render("tasks", {
        pageName: `Tareas del proyecto: ${project.name}`,
        project,
        projects
    });

}

exports.editProjectForm = async (req, res) => {
    const projectsPromise = Projects.findAll();

    const projectPromise = Projects.findOne({
        where: {
            id: req.params.id
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    res.render("newProject", {
        pageName: `Editar Proyecto: ${project.name}`,
        projects,
        project
    })
};

exports.editProject = async (req, res) => {
    const projectsPromise = Projects.findAll();

    const projectPromise = Projects.findOne({
        where: {
            id: req.params.id
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    // validate that data was sent
    const { name } = req.body;

    let errors = [];
    
    if (!name) {
        errors.push({"text": "Agrega un nombre al proyecto."});
    }

    if (errors.length > 0) {
        res.render("newProject", {
            pageName: `Editar proyecto: ${project.name}`,
            errors,
            projects,
            project
        });
    } else {
        await Projects.update(
            { name },
            {where: {id: req.params.id}}
            );
        res.redirect("/");
    }

}

exports.deleteProject = async(req, res, next) => {
    const {projectUrl} = req.query; // req.query or req.params
    const result = await Projects.destroy({where: { url: projectUrl}});

    if (!result) {
        return next();
    }
    
    res.status(200).send("Proyecto eliminado correctamente.");
}
const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

exports.projectsHome = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({
        where: {
            userId
        }
    });

    res.render("index", {
        pageName: "Proyectos",
        projects
    });
}

exports.newProjectForm = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({ where: { userId } });
    res.render("newProject", {
        pageName: "Nuevo proyecto",
        projects
    });
}

exports.newProject = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({ where: { userId } });

    // validate that data was sent
    const { name } = req.body;

    let errors = [];

    if (!name) {
        errors.push({ "text": "Agrega un nombre al proyecto." });
    }

    if (errors.length > 0) {
        res.render("newProject", {
            pageName: "Nuevo proyecto",
            errors,
            projects
        });
    } else {
        const project = await Projects.create({ name, userId });
        res.redirect("/");
    }

}

exports.projectByUrl = async (req, res) => {
    const userId = res.locals.user.id;
    const projectsPromise = Projects.findAll({ where: { userId } });

    const projectPromise = Projects.findOne({
        where: {
            url: req.params.url,
            userId
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    const tasks = await Tasks.findAll({
        where: {
            projectId: project.id,
        }
    });

    if (!project) return next();

    res.render("tasks", {
        pageName: `Tareas del proyecto: ${project.name}`,
        project,
        projects,
        tasks
    });

}

exports.editProjectForm = async (req, res) => {
    const userId = res.locals.user.id;
    const projectsPromise = Projects.findAll({ where: { userId } });

    const projectPromise = Projects.findOne({
        where: {
            id: req.params.id,
            userId
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
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({ where: { userId } });

    // validate that data was sent
    const { name } = req.body;

    let errors = [];

    if (!name) {
        errors.push({ "text": "Agrega un nombre al proyecto." });
    }

    if (errors.length > 0) {
        res.render("newProject", {
            pageName: `Editar proyecto`,
            errors,
            projects,
            project
        });
    } else {
        await Projects.update(
            { name },
            { where: { id: req.params.id } }
        );
        res.redirect("/");
    }

}

exports.deleteProject = async (req, res, next) => {
    const { projectUrl } = req.query; // req.query or req.params
    const result = await Projects.destroy({ where: { url: projectUrl } });

    if (!result) {
        return next();
    }

    res.status(200).send("Proyecto eliminado correctamente.");
}
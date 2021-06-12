const Tasks = require("../models/Tasks");
const Projects = require("../models/Projects");

exports.newTask = async (req, res, next) => {
    const projectsPromise = Projects.findAll();

    const projectPromise = Projects.findOne({
        where: {
            url: req.params.url
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    // validate that data was sent
    const { task } = req.body;

    let errors = [];
    
    if (!task) {
        errors.push({"text": "Agrega una tarea."});
    }

    if (errors.length > 0) {
        res.render("tasks", {
            pageName: `Tareas del proyecto ${project.name}`,
            errors,
            projects
        });
    } else {
        const isCompleted = false;
        const projectId = project.id;
        const result = await Tasks.create({ task, isCompleted, projectId });

        if (!result) {
            return next();
        }

        res.redirect(`/projects/${project.url}`);
    }

}
exports.projectsHome = (request, response) => {
    response.render("index", {
        pageName: "Proyectos"
    });
}

exports.newProject = (request, response) => {
    response.render("newProject", {
        pageName: "Nuevo proyecto"
    });
}
exports.projectsHome = (request, response) => {
    response.render("index", {
        pageName: "Proyectos"
    });
}

exports.newProjectForm = (request, response) => {
    response.render("newProject", {
        pageName: "Nuevo proyecto"
    });
}

exports.newProject = (req, res) => {
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
    }

}
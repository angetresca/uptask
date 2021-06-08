exports.projectsHome = (request, response) => {
    response.render("index");
}

exports.us = (request, response) => {
    response.send("Nosotros");
}
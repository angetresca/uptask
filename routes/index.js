const express = require("express");
const router = express.Router();


module.exports = function() {
    // ruta para el home
    router.get("/", (request, response) => {
        response.send("Index");
    })

    router.get("/nosotros", (request, response) => {
        response.send("Nosotros");
    })

    return router;
}


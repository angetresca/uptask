const Users = require("../models/Users");

exports.formNewAccount = (req, res) => {
    res.render("newAccount", {
        pageName: "Crear cuenta en Uptask"
    });
}

exports.newAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
        await Users.create({ email, password })
        res.redirect("/login");

    } catch (error) {
        req.flash("error", error.errors.map(error=>error.message))
        res.render("newAccount", {
            pageName: "Crear cuenta en Uptask",
            messages: req.flash(),
            email,
            password
        });
    }
}

exports.formLogin = (req, res) => {
    const { error } = res.locals.messages;
    res.render("login", {
        pageName: "Iniciar sesión en Uptask",
        error
    });
}

const Users = require("../models/Users");
const sendEmail = require("../handlers/email");

exports.formNewAccount = (req, res) => {
    res.render("newAccount", {
        pageName: "Crear cuenta en Uptask"
    });
}

exports.newAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
        await Users.create({
            email,
            password
        })

        // url confirm email
        const confirmURL = `http://${req.headers.host}/confirm/${email}`;

        // create user obj
        const user = {
            email
        }

        // send email
        await sendEmail.send({
            user,
            subject: "Confirmar cuenta - Uptask",
            confirmURL,
            file: "confirmAccount",
        });

        // redirect to the user
        req.flash("correcto", "Enviamos un correo, confirma tu cuenta");
        res.redirect("/login");

    } catch (error) {
        req.flash("error", error.errors.map(error => error.message))
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

exports.formRestorePassword = (req, res) => {
    res.render("restorePassword", {
        pageName: "Reestablecer contraseña"
    });
}

exports.confirmAccount = async (req, res) => {
    const user = await Users.findOne({ where: { email: req.params.email } });

    if (!user) {
        req.flash("error", "No válido");
        res.redirect("/new-account");
    }

    user.isActive = true;
    await user.save()

    req.flash("correcto", "Cuenta confirmada correctamente!");
    res.redirect("/login");
}
const passport = require("passport");
const Users = require("../models/Users");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt-nodejs");

exports.authenticateUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
});

// check if the user is logged in
exports.userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/login");
}

// logout

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
}

// token to restore password if the user is valid
exports.sendToken = async (req, res) => {
    const user = await Users.findOne({ where: { email: req.body.email } });

    // user does not exist
    if (!user) {
        req.flash("error", "No existe esa cuenta");
        res.redirect("/restorePassword");
    }

    // user exists
    user.token = crypto.randomBytes(20).toString("hex");
    user.expiration = Date.now() + 3600000; // 1 hour

    // save in DB
    await user.save();

    const restoreUrl = `http://${req.headers.host}/restore-password/${user.token}`;
}

exports.validateToken = async (req, res) => {
    const user = await Users.findOne({ where: { token: req.params.token } });

    if (!user) {
        req.flash("error", "Token no válido");
        res.redirect("/restore-password");
    }

    // user exists
    res.render("resetPassword", {
        pageName: "Reestablecer contraseña"
    });
}

exports.updatePassword = async (req, res) => {
    // validates token and expiration date
    const user = await Users.findOne({
        where: { 
            token: req.params.token,
            expiration: {
                [Op.gte] : Date.now()
            }
        }
    });

    if (!user) {
        req.flash("error", "Token no válido");
        res.redirect("/restore-password");
    }

    // user exists
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.token = null;
    user.expiration = null;
    await user.save();

    req.flash("correcto", "Tu contraseña se cambió correctamente");
    res.redirect("/login");
}

const passport = require("passport");

exports.authenticateUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
});

// check if the user is logged in
exports.userAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
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
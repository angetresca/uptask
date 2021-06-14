const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// model where we are authenticating
const Users = require("../models/Users");

// login with own credentials
passport.use(
    new LocalStrategy(
        // by default passport uses user - pass
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            try {
                const user = await Users.findOne({
                    where: { email }
                });
                // user exists but wrong password
                if (!user.validatePassword(password)) {
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    })
                }
                return done(null, user);
            } catch (error) {
                // user does not exist
                return done(null, false, {
                    message: "Esa cuenta no existe"
                })
            }
        }
    )
);

// serialize user
passport.serializeUser((user, callback)=>{
    callback(null, user);
})

// deserialize user
passport.deserializeUser((user, callback)=>{
    callback(null, user);
})

module.exports = passport;
const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("./Projects");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");

const Users = db.define("users", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Agrega un correo electrónico válido"
            },
            notEmpty: {
                msg: "La contraseña es obligatoria"
            }
        },
        unique: {
            args: true,
            msg: "Usuario ya registrado",
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La contraseña es obligatoria"
            }
        }
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

// custom methods
Users.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

Users.hasMany(Projects);

module.exports = Users;
const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("./Projects");

const Tasks = db.define("tasks", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    task: Sequelize.STRING(100),
    isCompleted: Sequelize.BOOLEAN
});

Tasks.belongsTo(Projects);

module.exports = Tasks;

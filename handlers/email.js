const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

let mailOptions = {
    from: "Uptask <no-reply@uptask.com>",
    to: "correo@correo.com",
    subject: "Cambio de contraseña - Uptask",
    text: "Hola",
    html: "<b>Hola</b>"
};

transport.sendMail(mailOptions);


const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const { htmlToText } = require("html-to-text");
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

const generateHTML = (file, options={}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
    return juice(html);
}

exports.send = async (options) => {
    const html = generateHTML(options.file, options);
    const text = htmlToText(html);

    let mailOptions = {
        from: "Uptask <no-reply@uptask.com>",
        to: options.user.email,
        subject: options.subject,
        text,
        html
    };
    
    // This is to make sendMail a promise
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, mailOptions);
}



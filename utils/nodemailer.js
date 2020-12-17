const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');
const path = require('path');

let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        secureProtocol: "TLSv1_method"
    }
});

transporter.use('compile', handlebars({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        defaultLayout: 'index',
        partialsDir: path.join(__dirname, '../views/partials')
    },
    viewPath: path.join(__dirname, '../views'),
    extName: '.handlebars'
}));

function sendEmail(to, subject, template, context) {
    let mailOptions = {
        from: '"Next Health" <support@ignitesdk.com>',
        to,
        subject,
        template,
        context
    };

    transporter.sendMail(mailOptions).then((err, info) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(info);
    });
}

module.exports = {
    sendEmail
}
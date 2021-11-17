const nodemailer = require('nodemailer')

// TODO: Env Var
const fromEmail = process.env.FROM_EMAIL;
const fromPassword = process.env.FROM_PASSWORD;

exports.handler = async function (event) {
    console.log(event)
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: fromEmail,
            pass: fromPassword
        }
    })

    await transporter.sendMail({
        from: `"Diane Ouellet" <${fromEmail}>`,
        to: 'isaac.computing@gmail.com',
        subject: 'Hello',
        text: event.body,
        html: event.body
    })

    console.log('Sent!')
}
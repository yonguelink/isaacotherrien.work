const nodemailer = require('nodemailer')

const fromEmail = process.env.FROM_EMAIL;
const fromPassword = process.env.FROM_PASSWORD;

exports.handler = async function (event) {
    console.log(`Body: ${event.body}`)
    const body = JSON.parse(event.body);

    if (body.email == null || body.email.length < 2) {
        console.error(`An email can't have less than 3 chars. Received: '${body.email}'`)
        return;
    }

    if (body.message == null || body.message.length < 2) {
        console.error(`A message must have more than 2 chars. Received: '${body.message}'`)
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: fromEmail,
            pass: fromPassword
        }
    })

    const message = `
        Message de: ${body.name},
        avec le courriel: ${body.email},
        en date du: ${body.date}
        <br />
        <br />
        ${body.message.replace(/\n/g, '<br />')}
    `;
    await transporter.sendMail({
        from: `"dianeouellet.ca" <${fromEmail}>`,
        to: fromEmail,
        subject: `Message de ${body.name} (${body.email})`,
        text: message,
        html: message
    })
}
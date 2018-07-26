const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "095aa737bfe4f3",
    pass: "35c2702ed68df2"
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;

}

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: 'Eric Nation <noreply@ericnation.io',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  }

  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);

}
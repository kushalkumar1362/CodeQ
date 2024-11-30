const nodemailer = require("nodemailer");

// this function sends email using nodemailer
// using the email, title and body provided
const mailSender = async (email, title, body) => {
  try {
    // create a transporter object using nodemailer
    // using the smtp host and the user and password
    // from the environment variables
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })

    // send the email using the transporter
    // and using the email, title and body provided
    let info = await transporter.sendMail({
      from: 'File Extractor - by Kushal Kumar',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    // console.log(info);
    // return the response from the transporter
    return info;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = mailSender;

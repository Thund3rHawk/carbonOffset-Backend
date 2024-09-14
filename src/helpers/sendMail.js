import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 25,
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MICROSOFT365_APP_PASSWORD,
  },
  debug: true,
  logger: true,
});

async function sendOtp() {
  const mailOptions = {
    from: process.env.MAIL_ADDRESS, //Sender mail
    to: "goperohan041@gmail.com", // Reciever Mail
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // Mail body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

sendOtp().catch(console.error);

export default sendOtp;

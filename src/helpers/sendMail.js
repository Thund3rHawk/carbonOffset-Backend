import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "no-reply@1world1nation.org",
    pass: "Sonali@098765",
  },
  tls: {
    ciphers: "SSLv3", // Optional: To avoid security errors
  },
});

async function sendOtp() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <no-reply@1world1nation.org>', // sender address
    to: "sonaliasrtech@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendOtp().catch(console.error);

export default sendOtp;

import axios from 'axios';
import { ConfidentialClientApplication } from '@azure/msal-node';

const config = {
    auth: {
        clientId: `${process.env.AZURE_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: `${process.env.AZURE_CLIENT_SECRET}`
    }
};

const pca = new ConfidentialClientApplication(config);

async function getToken() {
    const result = await pca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"]
    });
    return result.accessToken;
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
  try {
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function sendEmail(accessToken, subject, body, toRecipients) {
    const url = `https://graph.microsoft.com/v1.0/users/${process.env.MAIL_ADDRESS}/sendMail`;
    const email = {
        message: {
            subject: subject,
            body: {
                contentType: "Text",
                content: body
            },
            toRecipients: toRecipients.map(email => ({ emailAddress: { address: email } }))
        },
        saveToSentItems: true
    };


    try {
        const response = await axios.post(url, email, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("Email sent successfully");
        return response.data;
    } catch (error) {
        // console.error("Error sending email:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export default async function sendOtp(email) {
    try {
        const token = await getToken();
        await sendEmail(
            token,
            "Hello from 1World1Nation",
            "This is a test email sent from Node.js",
            [`${email}`],
        );
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error.message);        
        // throw error;
    }
}

export default sendOtp;

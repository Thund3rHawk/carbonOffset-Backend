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

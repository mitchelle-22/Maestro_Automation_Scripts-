const fetch = require('node-fetch');

const apiKey = process.env.MAILOSAUR_API_KEY;
const serverId = process.env.MAILOSAUR_SERVER_ID;

async function fetchOTP() {
    const response = await fetch(`https://mailosaur.com/api/messages?serverId=${serverId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
    });

    const data = await response.json();
    const otpEmail = data.items[0]; // Get the latest email
    const otp = otpEmail.subject.match(/\d{6}/)[0]; // Extract OTP from the subject or body

    console.log(otp); // Output the OTP to be used in Maestro
}

fetchOTP();

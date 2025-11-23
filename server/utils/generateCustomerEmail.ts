import { Resend } from 'resend';
import { Email } from '../types/Email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const generateCustomerEmail = async (emailData: Email) => {
    const { name, email, subject, message } = emailData;

    await resend.emails.send({
        from: 'OpravAuto <no-reply@info.opravauto.com>',
        to: 'info@opravauto.com',
        subject: `Subject: ${subject}`,
        html: `
            <html>
                <body>
                    <h1>New Message from ${name}</h1>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </body>
            </html>
        `,
    });
};

// // src/utils/mailer.ts
// import nodemailer from 'nodemailer';

// export const mailer = nodemailer.createTransport({
//     host: process.env.SMTP_HOST || "smtp.gmail.com",
//     port: Number(process.env.SMTP_PORT) || 587,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });

// // Helper na poslání access codu
// export const sendAccessCodeEmail = async (
//     toEmail: string,
//     orderId: string,
//     accessCode: string
// ) => {
//     const info = await mailer.sendMail({
//         from: '"OpravAuto" <no-reply@opravauto.com>',
//         to: toEmail,
//         subject: `Přístupový kód k zakázce ${orderId}`,
//         text: `Dobrý den,

// váš přístupový kód k zakázce ${orderId} je:

// ${accessCode}

// Pomocí tohoto kódu se můžete přihlásit do aplikace, potvrdit objednávku, vytisknout fakturu a sledovat stav své zakázky.

// S pozdravem
// OpravAuto`,
//     });

//     console.log('Access code email sent:', info.messageId);
// };

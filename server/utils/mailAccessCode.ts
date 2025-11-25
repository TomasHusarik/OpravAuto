import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAccessCodeEmail = async (to: string, orderId: string, accessCode: string) => {
  const logoFilePath = path.join(__dirname, '..', 'assets', 'opravAuto100x100.png');
  const logoBase64 = fs.readFileSync(logoFilePath).toString('base64');

  await resend.emails.send({
    from: 'OpravAuto <no-reply@info.opravauto.com>',
    to,
    subject: `Přístupový kód k zakázce #${orderId}`,
    html: `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
    }

    .logo {
      width: 70px;
      height: 70px;
      margin: 0 auto 5px auto;
      display: block;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }

    .content {
      padding: 40px 30px;
    }

    .content h2 {
      color: #333;
      font-size: 20px;
      margin-top: 0;
    }

    .content p {
      color: #666;
      line-height: 1.6;
      margin: 15px 0;
    }

    .code-box {
      background-color: #f9f9f9;
      border: 2px dashed #667eea;
      border-radius: 6px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    }

    .code-box .label {
      color: #999;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .code-box .code {
      font-size: 32px;
      font-weight: bold;
      color: #667eea;
      letter-spacing: 4px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
    }

    .button {
      display: inline-block;
      background-color: #667eea;
      color: white !important;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }

    .button-wrapper {
      text-align: center;
    }

    .button:hover {
      background-color: #5568d3;
    }

    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
    }

    .order-id {
      color: #667eea;
      font-weight: 600;
    }

    ol {
      color: #666;
      line-height: 1.8;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
    <img alt="OpravAuto Logo" class="logo" src="cid:logo-opravauto" />
     <h1>OpravAuto</h1>
    </div>

    <div class="content">
      <h2>Vaše zakázka je připravena! 🔧</h2>

      <p>Dobrý den,</p>

      <p>Vaše zakázka <span class="order-id">#691f6e4ff3429f424a68f3ae</span> je zaregistrována v našem systému.
        Pro přístup k detailům a sledování stavu zakázky použijte níže uvedený přístupový kód:</p>

      <div class="code-box">
        <div class="label">Váš přístupový kód</div>
        <div class="code">69V07ZR1</div>
      </div>

      <p><strong>Jak postupovat:</strong></p>
      <ol>
        <li>Navštivte aplikaci OpravAuto</li>
        <li>Zvolte "Zobrazit mou zakázku"</li>
        <li>Vložte výše uvedený kód</li>
        <li>Budete moci sledovat a upravovat stav vaší zakázky nebo stáhnout fakturu</li>
      </ol>

      <div class="button-wrapper">
        <a href="https://opravauto.com" class="button" style="color: white !important;">Přejít na aplikaci</a>
      </div>

      <p>Pokud máte jakékoliv otázky, kontaktujte nás na <strong>info@opravauto.cz</strong></p>

      <p>S pozdravem,<br><strong>OpravAuto tým</strong></p>
    </div>

    <div class="footer">
      <p>© 2025 OpravAuto. Všechna práva vyhrazena.</p>
      <p>Tento email byl odeslán na základě vytvoření vaší zakázky.</p>
    </div>
  </div>
</body>
</html>
        `,
    attachments: [
      {
        content: logoBase64,
        filename: 'opravAuto.png',
        contentId: 'logo-opravauto',
        contentType: 'image/png',
      },
    ],
  });
};

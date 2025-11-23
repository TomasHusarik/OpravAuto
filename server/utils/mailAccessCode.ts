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
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" lang="cs">
              <head>
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                <meta name="x-apple-disable-message-reformatting" />
              </head>
              <body style="background-color:rgb(255,255,255)">
                <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
                  <tbody>
                    <tr>
                      <td style='font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;background-color:rgb(255,255,255)'>
                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:100%;margin-right:auto;margin-left:auto;padding-right:0;padding-left:0;padding-top:20px;padding-bottom:48px;width:660px">
                          <tbody>
                            <tr style="width:100%">
                              <td>
                                <!-- HEADER -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                          <tbody style="width:100%">
                                            <tr style="width:100%">
                                              <td data-id="__react-email-column">
                                                <img alt="OpravAuto Logo" height="80" src="cid:logo-opravauto" style="display:block;outline:none;border:none;text-decoration:none" width="80" />
                                              </td>
                                              <td align="right" data-id="__react-email-column" style="display:table-cell">
                                                <p style="font-size:28px;line-height:24px;font-weight:300;color:rgb(136,136,136);margin-bottom:16px;margin-top:16px">Přístupový kód</p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- TITLE -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p style="font-size:14px;line-height:24px;text-align:center;margin:0;margin-top:36px;margin-bottom:40px;font-weight:500;color:rgb(17,17,17)">Vaše zakázka je připravena v našem systému. Použijte kód níže pro přístup k detailům a sledování stavu.</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- INFO BOX -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0 0;color:rgb(51,51,51);background-color:rgb(250,250,250);border-radius:3px;font-size:12px">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-height:46px">
                                          <tbody style="width:100%">
                                            <tr style="width:100%">
                                              <td colspan="2" data-id="__react-email-column">
                                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tbody>
                                                    <tr>
                                                      <td>
                                                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                          <tbody style="width:100%">
                                                            <tr style="width:100%">
                                                              <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:rgb(255,255,255);border-width:0px;border-right-style:solid;border-right-width:1px;border-bottom-style:solid;border-bottom-width:1px;min-height:44px">
                                                                <p style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102);margin-top:0;margin-bottom:0">ČÍSLO ZAKÁZKY</p>
                                                                <p style="font-size:12px;line-height:1.4;margin:0;padding:0;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">#${orderId}</p>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                          <tbody style="width:100%">
                                                            <tr style="width:100%">
                                                              <td data-id="__react-email-column" style="padding-left:20px;border-style:solid;border-color:rgb(255,255,255);border-width:0px;border-right-style:solid;border-right-width:1px;border-bottom-style:solid;border-bottom-width:1px;min-height:44px">
                                                                <p style="font-size:10px;line-height:1.4;margin:0;padding:0;color:rgb(102,102,102);margin-top:0;margin-bottom:0">DATUM VYTVOŘENÍ</p>
                                                                <p style="font-size:12px;line-height:1.4;margin:0;padding:0;margin-top:0;margin-bottom:0">${new Date().toLocaleDateString('cs-CZ')}</p>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- ACCESS CODE SECTION -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:40px;margin-bottom:40px">
                                  <tbody>
                                    <tr>
                                      <td align="center">
                                        <p style="font-size:12px;line-height:24px;color:rgb(102,102,102);margin:0;font-weight:600;margin-bottom:16px">VÁŠ PŘÍSTUPOVÝ KÓD</p>
                                        <p style="font-size:48px;line-height:1;font-weight:600;color:rgb(102,51,153);margin:0;letter-spacing:8px;font-family:'Courier New',monospace">${accessCode}</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- INSTRUCTIONS -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:rgb(250,250,250);border-radius:3px;padding:20px">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p style="font-size:12px;line-height:1.4;font-weight:600;margin:0;margin-bottom:12px;color:rgb(17,17,17)">Jak postupovat:</p>
                                        <ol style="font-size:12px;line-height:1.8;color:rgb(51,51,51);margin:0;padding-left:20px">
                                          <li style="margin-bottom:8px">Navštivte aplikaci OpravAuto</li>
                                          <li style="margin-bottom:8px">Vyberte "Zobrazit mou zakázku"</li>
                                          <li style="margin-bottom:8px">Vložte výše uvedený kód</li>
                                          <li style="margin-bottom:8px">Budete moci sledovat stav vaší zakázky</li>
                                        </ol>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- CTA BUTTON -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:40px">
                                  <tbody>
                                    <tr>
                                      <td align="center">
                                        <a href="https://opravauto.com/login" style="background:linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%);color:white;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:600;font-size:14px;display:inline-block">Přejít do aplikace</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-top:50px;margin-bottom:30px" />

                                <!-- FOOTER -->
                                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <p style="font-size:12px;line-height:normal;color:rgb(102,102,102);margin:0;margin-bottom:12px;text-align:center">Pokud máte jakékoliv otázky, kontaktujte nás na <a href="mailto:info@opravAuto.cz" style="color:#067df7;text-decoration:none">info@opravAuto.cz</a></p>
                                        <p style="font-size:12px;line-height:normal;color:rgb(102,102,102);margin:0;margin-bottom:12px;text-align:center">Kód je určen pouze pro tuto zakázku.</p>
                                        <p style="font-size:11px;line-height:normal;color:rgb(136,136,136);margin:0;margin-top:20px;text-align:center">© 2025 OpravAuto. Všechna práva vyhrazena.</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

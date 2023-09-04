import { createTransport, Transporter } from 'nodemailer';
interface NodeMailerProps {
  readonly host: string;
  readonly service: string;
  readonly port: number;
  readonly name: string;
  readonly user: string;
  readonly password: string;
  readonly secure: boolean;
  readonly transporter: Transporter;
  readonly email: string;
  readonly subject: string;
  readonly html: string;
}
type content = {
  email: string;
  userName: string;
  userInstituicao: string;
};
declare let process: {
  env: {
    NODE_ENV: 'development' | 'production';
    EMAIL_HOST: string;
    EMAIL_SERVICE: string;
    EMAIL_PORT: number;
    EMAIL_NAME: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    SECURE: boolean;
  };
};

export {};

export class NodeMailer implements NodeMailerProps {
  host: string;
  service: string;
  port: number;
  name: string;
  user: string;
  password: string;
  secure: boolean;
  transporter: Transporter;
  email: string;
  subject: string;
  html: string;

  constructor(content: content) {
    this.host = process.env.EMAIL_HOST;
    this.service = process.env.EMAIL_SERVICE;
    this.port = process.env.EMAIL_PORT;
    this.name = process.env.EMAIL_NAME;
    this.user = process.env.EMAIL_USER;
    this.password = process.env.EMAIL_PASSWORD;
    this.secure = process.env.SECURE;

    this.email = content.email;
    this.subject = 'Teste Email';
    this.html = this.FormatHtml(content.userName, content.userInstituicao);

    this.transporter = createTransport({
      host: this.host,
      service: this.service,
      port: Number(this.port),
      secure: Boolean(this.secure),
      auth: {
        user: this.user,
        pass: this.password,
      },
    });
  }

  FormatHtml(userName: string, userInstituicao: string):string  {
    const html = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
      </style>
      <![endif]-->
      <title>Registro em nossa plataforma.</title>
      <style>
        .hover-important-text-decoration-underline:hover {
          text-decoration: underline !important
        }
        @media (max-width: 600px) {
          .sm-w-6 {
            width: 24px !important
          }
          .sm-px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important
          }
          .sm-px-4 {
            padding-left: 16px !important;
            padding-right: 16px !important
          }
          .sm-px-6 {
            padding-left: 24px !important;
            padding-right: 24px !important
          }
          .sm-py-8 {
            padding-top: 32px !important;
            padding-bottom: 32px !important
          }
          .sm-text-3xl {
            font-size: 30px !important
          }
          .sm-leading-10 {
            line-height: 40px !important
          }
          .sm-leading-8 {
            line-height: 32px !important
          }
        }
      </style>
    </head>
    <body style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
      <div style="display: none">
        Sua solicitação de adesão foi aceita.
        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
      </div>
      <div role="article" aria-roledescription="email" aria-label="Registro em nossa plataforma." lang="en">
        <div class="sm-px-4" style="background-color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
          <table align="center" cellpadding="0" cellspacing="0" role="none">
            <tr>
              <td style="width: 600px; max-width: 100%">
                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
                  <tr>
                    <td class="sm-py-8 sm-px-6" style="padding: 48px; text-align: center">
                      <a href="https://nourishnet.net/">
                        <img src="images/Nourishnet.png" width="170" alt="Logo de uma plataforma online, ligada ao ramo da logística alimentar. Essa logo contém apenas um texto com o nome da plataforma Nourishnet.net, o texto está na cor preta." style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0">
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-radius: 4px; background-size: cover; background-position: top; background-repeat: no-repeat; text-align: left; background-image: url('undefined')"><!--[if mso]>
    <v:rect stroke="f" fillcolor="none" style="width: 600px" xmlns:v="urn:schemas-microsoft-com:vml">
    <v:fill type="frame" src="undefined" />
    <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text: true"><div><![endif]-->
                      <div role="separator" class="sm-leading-8" style="line-height: 12px">&zwj;</div>
                      <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
                        <tr>
                          <td class="sm-w-6" style="width: 48px"></td>
                          <td>
                            <h1 class="sm-text-3xl sm-leading-10" style="margin: 0 0 4px; color: #334155">
                              Olá ${userName}, sua solicitação de adesão foi aceita!
                            </h1>
                          </td>
                          <td class="sm-w-6" style="width: 48px"></td>
                        </tr>
                      </table>
                      <div role="separator" class="sm-leading-8" style="line-height: 16px">&zwj;</div><!--[if mso]></div></v:textbox></v:rect><![endif]-->
                    </td>
                  </tr>
                  <tr role="separator">
                    <td style="line-height: 32px">&zwj;</td>
                  </tr>
                  <tr>
                    <td class="sm-px-0" style="width: 100%; padding-left: 24px; padding-right: 24px; text-align: left">
                      <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
                        <tr>
                          <td style="padding-bottom: 4px">
                            <table style="width: 100%; text-align: center;" cellpadding="0" cellspacing="0" role="none">
                              <tr>
                                <td style="border-radius: 4px; background-color: #fff; padding: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155">
                                    Prezado(a) ${userName},
                                  </p>
                                  <p style="margin: 0 0 4px; text-align: left; font-size: 16px; color: #334155;">
                                    É com grande alegria que informamos que sua solicitação de adesão à <span style="font-weight: 700">${userInstituicao} </span> foi aceita com sucesso!
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="border-radius: 4px; background-color: #fff; padding: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155;">Damos as boas-vindas calorosas à nossa comunidade e estamos entusiasmados com a sua decisão de se juntar a nós em nossa missão de aprimorar a logística alimentar. Agora, você tem acesso completo à nossa plataforma e a todos os recursos que oferecemos para promover uma gestão eficiente da alimentação em diversas instituições.</p>
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155;">Reforçamos a importância de usar nossa plataforma com responsabilidade, seguindo nossas diretrizes e regras para garantir que a logística alimentar seja gerenciada de maneira eficaz e benéfica para todos os envolvidos.</p>
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155;">Estamos aqui para apoiá-lo(a) durante sua jornada na melhoria da logística alimentar. Se surgir alguma dúvida ou se você precisar de assistência, não hesite em entrar em contato conosco.</p>
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155;">Uma vez mais, parabéns! Desejamos que tenha uma experiência excepcional conosco e que suas contribuições promovam uma gestão de alimentação mais eficiente em sua instituição.</p>
                                  <p style="margin: 0 0 16px; text-align: left; font-size: 16px; color: #334155;">Atenciosamente,</p>
                                  <p style="margin: 0 0 64px; text-align: left; font-size: 16px; font-weight: 700; color: #334155">Equipe Nourishnet.</p>
                                  <div>
                                    <a href="https://maizzle.com" style="display: inline-block; border-radius: 4px; background-color: #000; padding: 16px 24px; font-size: 16px; font-weight: 600; text-transform: uppercase; line-height: 1; color: #f8fafc; text-decoration: none">
                                      <!--[if mso]>
          <i style="mso-font-width: -100%; letter-spacing: 32px; mso-text-raise: 30px" hidden>&nbsp;</i>
        <![endif]-->
                                      <span style="mso-text-raise: 16px">
                                  Fazer login &rarr;
                                </span>
                                      <!--[if mso]>
          <i style="mso-font-width: -100%; letter-spacing: 32px;" hidden>&nbsp;</i>
        <![endif]-->
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr role="separator">
                    <td class="sm-leading-8" style="line-height: 64px">&zwj;</td>
                  </tr>
                  <tr role="separator">
                    <td class="sm-leading-8" style="line-height: 64px">&zwj;</td>
                  </tr>
                  <tr>
                    <td class="sm-px-6" style="border-radius: 4px; background-color: #fff; padding: 16px 48px; text-align: center; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                      <p style="margin: 0; font-size: 14px; color: #64748b">
                        Copyright &copy; 2023
                      </p>
                      <a href="https://nourishnet.net/login/" class="hover-important-text-decoration-underline" style="font-weight: 700; color: #000; text-decoration: none">Nourishnet</a>
                    </td>
                  </tr>
                  <tr role="separator">
                    <td class="sm-leading-8" style="line-height: 48px">&zwj;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>`;

    return html;
  }
  async SendEmail(): Promise<0 | 1> {
    console.log(this.html);
    try {
      await this.transporter.sendMail({
        from: this.name,
        to: this.email,
        subject: this.subject,
        html: this.html,
      });
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }
}


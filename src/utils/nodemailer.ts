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
  subject: string;
  html: string;
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
    this.subject = content.subject;
    this.html = content.html;

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

  async SendEmail(): Promise<0 | 1> {
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


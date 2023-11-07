import dotenv from 'dotenv';

dotenv.config();
import nodemailer from 'nodemailer';
import process from 'process';
import fs from 'fs';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const templatePath = path.join(dirname, '..', 'templates', 'feedback.ejs');

class NodeMailer {
  constructor(content) {
    this.host = process.env.EMAIL_HOST;
    this.service = process.env.EMAIL_SERVICE;
    this.port = process.env.EMAIL_PORT;
    this.name = process.env.EMAIL_NAME;
    this.user = process.env.EMAIL_USER;
    this.password = process.env.EMAIL_PASSWORD;
    this.secure = process.env.SECURE;

    this.userName = content.userName;
    this.userInstituicao = content.userInstituicao;
    this.email = content.email;
    this.subject = content.subject;
    this.userEmail = content.userEmail;
    this.rating = content.rating;
    this.feedback = content.feedback;
    this.food = content.food;
    this.transporter = nodemailer.createTransport({
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

  async formatHtml(userName, userInstituicao, userEmail, food, rating, feedback) {
    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        this.html = String(ejs.render(data, {
          userName, userInstituicao, userEmail, food, rating, feedback,
        }));

        resolve();
      });
    });
  }

  async sendEmail() {
    try {
      await this.formatHtml(
        this.userName,
        this.userInstituicao,
        this.userEmail,
        this.food,
        this.rating,
        this.feedback,
      );
      await this.transporter.sendMail({
        from: this.name,
        to: this.email,
        subject: this.subject,
        html: `${this.html}`,
      });
      return 1;
    } catch (e) {
      return 0;
    }
  }
}

export default NodeMailer;

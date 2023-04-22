import { NodeMailer } from "../utils/nodemailer.js";

class EmailController {
  async create(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("You need to type a email");
      if (!req.body.subject) return res.status(400).json("You need to type a subject");
      const { email, subject, html } = req.body;
      console.log(email);
      console.log(html);
      await new NodeMailer({ email, subject, html }).SendEmail();

      res.json("Email sucessfuly sent");
    } catch (e) {
      res.status(500).json("An error ocurred");
    }
  }
}

export default new EmailController();

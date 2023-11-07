import PedidoAceito from "../utils/nodemailer/pedido-aceito-nodemailer.js";
import PedidoNegado from "../utils/nodemailer/pedido-negado-nodemailer.js";
import ConfirmarEmail from "../utils/nodemailer/confirmar-email-nodemailer.js";
import EnviarFeedback from "../utils/nodemailer/feedback.js";

class EmailController {
  async PedidoAceito(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("You need to type a email");
      if (!req.body.subject) return res.status(400).json("You need to type a subject");
      const {
        email, subject, userName, userInstituicao,
      } = req.body;

      const nodeMailer = new PedidoAceito({
        email, subject, userName, userInstituicao,
      });

      await nodeMailer.sendEmail();
      res.json("Email sucessfuly sent");
    } catch (e) {
      console.log(e);
      res.status(500).json("An error ocurred");
    }
  }

  async PedidoNegado(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("You need to type a email");
      if (!req.body.subject) return res.status(400).json("You need to type a subject");
      const {
        email, subject, userName, userInstituicao,
      } = req.body;

      const nodeMailer = new PedidoNegado({
        email, subject, userName, userInstituicao,
      });

      await nodeMailer.sendEmail();
      res.json("Email sucessfuly sent");
    } catch (e) {
      console.log(e);
      res.status(500).json("An error ocurred");
    }
  }

  async ConfirmarEmail(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("You need to type a email");
      if (!req.body.subject) return res.status(400).json("You need to type a subject");
      const {
        email, subject, userName, emailLink,
      } = req.body;

      const nodeMailer = new ConfirmarEmail({
        email, subject, userName, emailLink,
      });

      await nodeMailer.sendEmail();
      res.json("Email sucessfuly sent");
    } catch (e) {
      console.log(e);
      res.status(500).json("An error ocurred");
    }
  }

  async EnviarFeedback(req, res) {
    try {
      if (!req.body.email) return res.status(400).json("You need to type a email");
      if (!req.body.subject) return res.status(400).json("You need to type a subject");
      const {
        email, subject, userName, userInstituicao, userEmail, food, rating, feedback,
      } = req.body;

      const nodeMailer = new EnviarFeedback({
        email, subject, userName, userInstituicao, userEmail, food, rating, feedback,
      });

      await nodeMailer.sendEmail();
      res.json("Email sucessfuly sent");
    } catch (e) {
      console.log(e);
      res.status(500).json("An error ocurred");
    }
  }
}

export default new EmailController();

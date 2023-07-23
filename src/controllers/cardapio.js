import Cardapio from "../models/Cardapios";
import Semanas from "../utils/weekNumber";

class CardapioController {
  async index(req, res) {
    const cardapios = await Cardapio.findAll({
      where: {
        weeknumber: Semanas.pegarDataAtual(),
      },
    });
    const days = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const position = (Day) => {
      const pos = days.indexOf(Day);
      return pos;
    };
    cardapios.map((cardapio) => {
      cardapio.position = position(cardapio.dayname);
    });
    cardapios.sort((a, b) => {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    });
    return res.json(cardapios);
  }

  async indexAll(req, res) {
    const cardapios = await Cardapio.findAll({ where: { school_id: 5 } });
    const days = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const position = (Day) => {
      const pos = days.indexOf(Day);
      return pos;
    };
    cardapios.map((cardapio) => {
      cardapio.position = position(cardapio.dayname);
    });
    cardapios.sort((a, b) => {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    });
    return res.json(cardapios);
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: 'Missing ID' });
      if (req.userLevel < 2) return res.status(401).json({ error: 'Invalid permission' });
      const cardapio = await Cardapio.findByPk(req.params.id);
      if (cardapio.school_id !== req.user.School_id) return res.status(401).json("You cannot update this cardapio");
      await cardapio.update(req.body);

      return res.json({
        updated: true,
        theDoc: cardapio,
      });
    } catch (e) { return res.status(400).json("An error ocurred"); }
  }

  async create(req, res) {
    try {
      if (req.userLevel < 2) return res.status(401).json({ error: 'Invalid permission' });
      if (!req.body.dayname) return res.status(400).json("Please fill the field with the day name");
      if (!req.user.School_id) return res.status(401).json("Please login in the site");
      if (!req.body.breakfast && !req.body.lunch && !req.body.afternoonsnack) return res.status(400).json("Please fill one of these fields: Breakfast, Lunch, Afternoonsnack");

      req.body.school_id = req.user.School_id;
      if (req.body.weeknumber !== 1 && req.body.weeknumber !== 0) return res.status(400).json({ msg: "Please type the weekNumber" });
      const cardapioExist = await Cardapio.findOne({
        where: {
          dayname: req.body.dayname,
          weeknumber: req.body.weeknumber,
          school_id: req.user.School_id,
        },
      });
      if (cardapioExist) return res.status(400).json("Cardapio already exist, please try to update it");
      const cardapio = await Cardapio.create(req.body);
      return res.status(200).json({
        msg: "Successfully created",
        cardapio,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: 'Missing ID' });
      if (!req.user.School_id) return res.status(401).json("Make login");

      const cardapio = await Cardapio.findOne({
        where: {
          id: req.params.id,
          school_id: req.user.School_id,
        },
      });
      if (!cardapio) return res.status(404).json("Cardapio not found");
      await cardapio.destroy();

      return res.status(200).json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CardapioController();

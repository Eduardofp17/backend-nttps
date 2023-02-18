"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Cardapios = require('../models/Cardapios'); var _Cardapios2 = _interopRequireDefault(_Cardapios);
var _weekNumber = require('../utils/weekNumber'); var _weekNumber2 = _interopRequireDefault(_weekNumber);

class CardapioController {
  async index(req, res) {
    const cardapio = await _Cardapios2.default.findAll({
      where: {
        school_id: req.user.School_id, weeknumber: _weekNumber2.default.pegarDataAtual(),
      },
    });
    return res.json(cardapio);
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: 'Missing ID' });
      const cardapio = await _Cardapios2.default.findByPk(req.params.id);
      if (cardapio.school_id !== req.user.School_id) return res.status(401).json("You cannot update this cardapio");
      if (req.userLevel < 3) return res.status(401).json({ error: 'Permissão inválida' });
      await cardapio.update(req.body);

      return res.json({
        updated: true,
        theDoc: cardapio,
      });
    } catch (e) { return res.status(400).json("An error ocurred"); }
  }

  async create(req, res) {
    try {
      if (!req.body.dayname) return res.status(400).json("Please fill the field with the day name");
      if (!req.user.School_id) return res.status(401).json("Make login, seu gaiato");
      if (!req.body.Breakfast && !req.body.Lunch && !req.body.AfternoonSnack) return res.status(400).json("Please fill one of these fields: Breakfast, Lunch, Afternoonsnack");

      req.body.school_id = req.user.School_id;
      const cardapioExist = await _Cardapios2.default.findOne({
        where: {
          dayname: req.body.dayname,
          weeknumber: req.body.weeknumber,
          school_id: req.user.School_id,
        },
      });
      if (cardapioExist) return res.status(400).json("Cardapio already exist, plesa try to update it");
      const cardapio = await _Cardapios2.default.create(req.body);
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
      if (!req.user.School_id) return res.status(401).json("Make login, seu gaiato");

      const cardapio = await _Cardapios2.default.findOne({
        where: {
          id: req.params.id,
          school_id: req.user.School_id,
        },
      });
      if (!cardapio) return res.status(400).json("Cardapio doesn't exist");
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

exports. default = new CardapioController();

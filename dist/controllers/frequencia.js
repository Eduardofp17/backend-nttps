"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Frequencia = require('../models/Frequencia'); var _Frequencia2 = _interopRequireDefault(_Frequencia);
var _lastFrequency = require('./lastFrequency'); var _lastFrequency2 = _interopRequireDefault(_lastFrequency);
var _LastFrequency = require('../models/LastFrequency'); var _LastFrequency2 = _interopRequireDefault(_LastFrequency);

class FrequenciaController {
  async index(req, res) {
    try {
      const frequencias = await _Frequencia2.default.findAll({ where: { school_id: req.user.School_id } });
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const sala = await _Frequencia2.default.findOne({
        where: { sala: req.body.sala, school_id: req.user.School_id },
      });
      if (!sala) return res.status(400).json({ errors: ['A sala não existe'] });
      if (!req.user.School_id) return res.status(401).json("You must be associate to an school");
      if (req.user.School_id !== sala.school_id) return res.status(401).json("Invalid permission");
      const updated_by = `${req.user.Nome} ${req.user.Sobrenome}`;

      req.body.school_id = req.user.School_id;
      req.body.updated_by = updated_by;
      req.body.Date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      req.body.Hour = `${new Date().getHours()}:${new Date().getMinutes()}`;
      const frequenciaAtt = await sala.update(req.body);

      const find = await _LastFrequency2.default.findOne({
        where: {
          sala: req.body.sala,
          Date: req.body.Date,
          school_id: req.user.School_id,
        },
      });
      if (!find) {
        await _lastFrequency2.default.create(req.body);
      } else {
        await _lastFrequency2.default.update(req.body);
      }
      return res.json(frequenciaAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.status(400).json("Please, fill in the fields");
      if (!req.user.School_id) return res.status(401).json("You must be associate to an school");
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome}`;
      req.body.school_id = req.user.School_id;
      const exist = await _Frequencia2.default.findOne({
        where: {
          sala: req.body.sala,
          school_id: req.user.School_id,
        },
      });
      if (exist) return res.status(400).json("Sala already exist");
      const frequencia = await _Frequencia2.default.create(req.body);

      return res.status(200).json(frequencia);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          deleted: false,
          msg: "Missing ID",
        });
      }

      const frequencia = await _Frequencia2.default.findByPk(req.params.id);
      if (!frequencia) {
        return res.status(400).json({
          deleted: false,
          msg: "Frequencia doesn't exist",
        });
      }
      await frequencia.destroy();

      return res.status(200).json({
        deleted: true,
        msg: "Successfully deleted",
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new FrequenciaController();

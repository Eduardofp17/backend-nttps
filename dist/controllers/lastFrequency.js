"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _LastFrequency = require('../models/LastFrequency'); var _LastFrequency2 = _interopRequireDefault(_LastFrequency);

class LastFrequencyController {
  async index(req, res) {
    try {
      const frequencias = await _LastFrequency2.default.findAll(
        { where: { school_id: req.user.School_id } },
      );
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(frequencia) {
    if (frequencia.Hour >= '07:00' && frequencia.Hour <= '09:30') {
      const body = {
        sala: frequencia.sala,
        breakfast: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await _LastFrequency2.default.create(body);
    }
    if (frequencia.Hour >= '09:50' && frequencia.Hour <= '11:30') {
      const body = {
        sala: frequencia.sala,
        lunch: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await _LastFrequency2.default.create(body);
    }
    if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
      const body = {
        sala: frequencia.sala,
        afternoonsnack: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await _LastFrequency2.default.create(body);
    }
    return 'Is not a valid turn';
  }

  async update(frequencia) {
    const frequenciasHistoric = await _LastFrequency2.default.findOne({
      where: {
        sala: frequencia.sala,
        Date: frequencia.Date,
        school_id: frequencia.school_id,
      },
    });
    if (frequencia.Hour >= '07:00' && frequencia.Hour <= '09:30') {
      const body = {
        sala: frequencia.sala,
        breakfast: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await frequenciasHistoric.update(body);
    }
    if (frequencia.Hour >= '09:50' && frequencia.Hour <= '11:30') {
      const body = {
        sala: frequencia.sala,
        lunch: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await frequenciasHistoric.update(body);
    }
    if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
      const body = {
        sala: frequencia.sala,
        afternoonsnack: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
        school_id: frequencia.school_id,
      };
      await frequenciasHistoric.update(body);
    }
    return 'Is not a valid turn';
  }
}

exports. default = new LastFrequencyController();

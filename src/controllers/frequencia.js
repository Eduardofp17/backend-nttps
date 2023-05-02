import Frequencia from "../models/Frequencia";
import LastFrequencyController from "./lastFrequency";
import FrequenciasHistoric from "../models/LastFrequency";

class FrequenciaController {
  async index(req, res) {
    try {
      const frequencias = await Frequencia.findAll({ where: { school_id: req.user.School_id } });
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const sala = await Frequencia.findOne({
        where: { id: req.params.id, school_id: req.user.School_id },
      });
      if (!sala) return res.status(400).json({ errors: ['A sala não existe'] });
      if (!req.user.School_id) return res.status(401).json("You must be associate to an school");
      if (req.user.School_id !== sala.school_id) return res.status(401).json("Invalid permission");

      req.body.school_id = req.user.School_id;
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome ? req.user.Sobrenome : ''}`;
      req.body.Date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      req.body.Hour = `${new Date().getHours()}:${new Date().getMinutes()}`;
      const frequenciaAtt = await sala.update(req.body);

      const find = await FrequenciasHistoric.findOne({
        where: {
          sala: req.body.sala,
          Date: req.body.Date,
          school_id: req.user.School_id,
        },
      });

      if (!find) {
        await LastFrequencyController.create(req.body);
      } else {
        await LastFrequencyController.update(req.body);
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
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome ? req.user.Sobrenome : ''}`;
      req.body.school_id = req.user.School_id;
      const exist = await Frequencia.findOne({
        where: {
          sala: req.body.sala,
          school_id: req.user.School_id,
        },
      });
      if (exist) return res.status(400).json("Sala already exist");
      const frequencia = await Frequencia.create(req.body);

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

      const frequencia = await Frequencia.findByPk(req.params.id);
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

export default new FrequenciaController();

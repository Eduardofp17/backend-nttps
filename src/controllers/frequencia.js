import { Op } from 'sequelize';
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
      const { id } = req.params;
      if (!id) return res.status(400).json({ updated: false, msg: "Missing ID" });
      const sala = await Frequencia.findOne({
        where: { id: req.params.id, school_id: req.user.School_id },
      });
      if (!sala) return res.status(404).json({ updated: false, msg: "Frequencia not found" });
      if (!req.user.School_id) return res.status(401).json({ updated: false, msg: "You must be associate to an school" });
      if (req.user.School_id !== sala.school_id) return res.status(401).json({ updated: false, msg: "Invalid permission" });

      req.body.sala = sala.sala;
      req.body.school_id = req.user.School_id;
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome ? req.user.Sobrenome : ''}`;
      const frequenciaAtt = await sala.update(req.body);

      const hoje = new Date();
      const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0);
      const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59);

      const find = await FrequenciasHistoric.findOne({
        where: {
          sala: req.body.sala,
          updated_at: {
            [Op.gte]: inicioDoDia,
            [Op.lte]: fimDoDia,
          },
          school_id: req.user.School_id,
        },
      });

      if (!find) {
        await LastFrequencyController.create(req.body);
      } else {
        await LastFrequencyController.update(find, req.body.qtd_presentes);
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
        return res.status(404).json({
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

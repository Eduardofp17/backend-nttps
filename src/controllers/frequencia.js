import { Op } from 'sequelize';
import Frequencia from "../models/Frequencia.js";
import LastFrequencyController from "./lastFrequency.js";
import FrequenciasHistoric from "../models/LastFrequency.js";
import Room from '../models/room.js';
import Students from '../models/student.js';

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

  async indexOnlyToday(req, res) {
    try {
      const frequencias = await Frequencia.findAll(
        {
          where: {
            school_id: req.user.School_id,
            created_at: {
              [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
              [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },

        },
      );
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async indexRoomFrequency(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ msg: "Room id is required" });
      const frequencias = await Frequencia.findAll(
        {
          where: {
            school_id: req.user.School_id,
            room_id: id,
          },

        },
      );
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
      if (!id || id === 'undefined' || Number.isNaN(id)) return res.status(400).json({ updated: false, msg: "Student_id is required" });
      const student = await Students.findByPk(id);
      if (!student) return res.status(404).json({ updated: false, msg: "Not found" });
      if (req.user.Level === 1 && req.user.room_id !== student.room_id) return res.status(401).json({ updated: false, msg: "You can only update a student's frequency of your room" });
      if (!req.user.School_id) return res.status(401).json({ updated: false, msg: "You must be associate to an school" });
      const hour = new Date().getHours();
      if (hour < 7 || hour > 17) return res.status(400).json({ updated: false, msg: "Hour not allowed" });
      req.body.school_id = req.user.School_id;
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome ? req.user.Sobrenome : ''}`;
      const frequency = await Frequencia.findOne({
        where: {
          school_id: req.user.School_id,
          student_id: id,
          created_at: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
            [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      });
      req.body.room_id = Number(student.room_id);
      if (!frequency) {
        req.body.student_id = Number(id);
        await Frequencia.create(req.body);
        return res.status(204).send();
      }
      if (req.user.School_id !== frequency.school_id) {
        return res.status(401).json({
          updated: false,
          msg: "You don't have permission to update a frequency from a different school.",
        });
      }

      await frequency.update(req.body);
      return res.status(204).send();
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.status(400).json("Please, fill in the fields");
      if (!req.body.student_id) return res.status(400).json("Student_id is required");
      if (!req.user.School_id) return res.status(401).json("You must be associate to an school");
      req.body.updated_by = `${req.user.Nome} ${req.user.Sobrenome ? req.user.Sobrenome : ''}`;
      req.body.school_id = req.user.School_id;
      const exist = await Frequencia.findOne({
        where: {
          school_id: req.user.School_id,
          student_id: req.body.student_id,
          created_at: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
            [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      });
      if (exist) return res.status(400).json("Frequencia already exist");

      await Frequencia.create({
        school_id: req.user.School_id,
        student_id: req.body.student_id,
        updated_by: req.body.updated_by,
      });
      return res.status(204).send();
    } catch (e) {
      console.log(e);
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

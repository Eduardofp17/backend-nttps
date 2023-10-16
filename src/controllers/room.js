import Room from "../models/room.js";
import Students from "../models/student.js";
import Frequencia from "../models/Frequencia.js";

class RoomController {
  async index(req, res) {
    try {
      if (req.user.Level === 1) {
        const result = await Room.findOne({
          where: { school_id: req.user.School_id, id: req.user.room_id },
          include: [
            { model: Students },
            { model: Frequencia },
          ],
        });
        return res.status(200).json(result);
      }
      const result = await Room.findAll({
        where: { school_id: req.user.School_id },
        include: [
          { model: Students },
          { model: Frequencia },
        ],
      });
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  }

  async create(req, res) {
    try {
      if (!req.body.name) return res.status(400).json({ error: true, msg: "Missing name" });
      if (typeof req.body.name !== 'string') return res.status(400).json({ error: true, msg: "Name must be a string" });
      const room = await Room.findOne({
        where: {
          name: req.body.name,
          school_id: req.user.School_id,
        },
      });
      if (room) return res.status(400).json({ error: true, msg: "Room already exist" });
      await Room.create({ name: req.body.name, school_id: req.user.School_id });
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: true, msg: "Missing ID" });
      if (!req.body.name) return res.status(400).json({ error: true, msg: "Missing name" });
      const { id } = req.params;
      const room = await Room.findByPk(id);
      if (!room) return res.status(404).send();
      await room.update({ name: req.body.name });
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: true, msg: "Missing ID" });
      const { id } = req.params;
      const room = await Room.findByPk(id);
      if (!room) return res.status(404).send();
      await room.destroy();
      return res.status(201).send();
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  }
}

export default new RoomController();

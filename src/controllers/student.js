import Students from "../models/student.js";

class StudentController {
  async index(req, res) {
    try {
      const options = req.user.Level === 1 ? { where: { room_id: req.user.room_id } } : {};

      const result = await Students.findAll(options);

      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  }

  async create(req, res) {
    try {
      if (!req.body.name) return res.status(400).json({ error: true, msg: 'Missing name' });
      if (!req.body.room_id) return res.status(400).json({ error: true, msg: 'Missing roomId' });
      const student = await Students.findOne({
        where: {
          name: req.body.name, room_id: req.body.room_id,
        },
      });
      if (student) return res.status(400).json({ error: true, msg: 'Student already exist' });
      await Students.create({ name: req.body.name, room_id: req.body.room_id });
      return res.status(201).json({ success: true, msg: 'Successfully created' });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ updated: false, msg: 'Missing ID' });
      if (!req.body.name && !req.body.room_id) return res.status(400).json({ updated: false, msg: 'Missing an information' });
      const { id } = req.params;
      const student = await Students.findByPk(id);
      if (!student) return res.status(404).send();
      const anyStudent = await Students.findOne({
        where: { name: req.body.name, room_id: student.room_id },
      });
      if (anyStudent) return res.status(400).json({ updated: false, msg: 'Already exist a student with this names in your school' });
      student.update(req.body);
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: true, msg: 'Missing ID' });

      const { id } = req.params;
      const student = await Students.findByPk(id);
      if (!student) return res.status(404).send();
      student.destroy();
      return res.status(204).send();
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default StudentController;

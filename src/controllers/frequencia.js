import Frequencia from "../models/Frequencia";
import LastFrequencyController from "./lastFrequency";
import FrequenciasHistoric from "../models/LastFrequency";

class FrequenciaController {
  async index(req, res) {
    try {
      const frequencias = await Frequencia.findAll();
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const sala = await Frequencia.findOne({ where: { sala: req.body.sala } });
      if (!sala) return res.status(400).json({ errors: ['A sala não existe'] });

      const updated_by = `${req.user.Nome} ${req.user.Sobrenome}`;

      req.body.updated_by = updated_by;
      req.body.Date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      req.body.Hour = `${new Date().getHours()}:${new Date().getMinutes()}`;
      const frequenciaAtt = await sala.update(req.body);

      const find = await FrequenciasHistoric.findOne({
        where: {
          sala: req.body.sala,
          Date: req.body.Date,
        },
      });

      console.log(req.body);
      if (!find) {
        await LastFrequencyController.create(req.body);
        return res.json("dont exist");
      }
      await LastFrequencyController.update(req.body);
      return res.json(frequenciaAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new FrequenciaController();

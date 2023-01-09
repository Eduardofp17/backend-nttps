import Frequencia from "../models/Frequencia";

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
      console.log(req.body.Date);
      const frequenciaAtt = await sala.update(req.body);
      return res.json(frequenciaAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  // async create(req, res) {
  //   try {
  //     const newFrequencia = await Frequencia.create(req.body);

  //     return res.json(newFrequencia);
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }
}

export default new FrequenciaController();

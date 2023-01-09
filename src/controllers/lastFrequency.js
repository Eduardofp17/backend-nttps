import Frequencia from "../models/Frequencia";
// import LastFrequency from "../models/LastFrequency";

class LastFrequencyController {
  async index(req, res) {
    try {
      const dateNow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      const frequencias = await Frequencia.findAll({ where: { Date: dateNow } });
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    const hour = `${new Date().getHours()}:${new Date().getMinutes()}`;
    // const frequencias = await Frequencia.findAll();
    if (hour >= '07:00' && hour <= '08:50') {
      // const latest = LastFrequency.create();
    }
    if (hour >= '09:10' && hour <= '11:30') {
      return res.json({
        lunch: true,
        hour,
      });
    }
    if (hour >= '13:00' && hour <= '14:40') {
      return res.json({
        afternoon: true,
        hour,
      });
    }
    return res.json({
      msg: 'is not a valid turn',
      hour,
    });
  }
}

export default new LastFrequencyController();

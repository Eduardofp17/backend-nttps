import Frequencia from "../models/Frequencia";
import FrequenciasHistoric from "../models/LastFrequency";

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
    const dateNow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const frequencias = await Frequencia.findAll({ where: { Date: dateNow } });

    const frequenciasToday = [];
    frequencias.map(async (frequencia) => {
      if (frequencia.Hour >= '07:00' && frequencia.Hour <= '08:50') {
        return frequenciasToday.push({
          sala: frequencia.sala,
          morning: true,
          hour: frequencia.Hour,
        });
      }
      if (frequencia.Hour >= '09:10' && frequencia.Hour <= '11:30') {
        return frequenciasToday.push({
          sala: frequencia.sala,
          lunch: true,
          hour: frequencia.Hour,
        });
      }
      if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
        const exist = await FrequenciasHistoric.findOne({
          where: {
            sala: frequencia.sala,
            Date: frequencia.Date,
          },
        });
        if (exist) return 1;
        console.log(exist);
        const body = {
          sala: frequencia.sala,
          afternoonsnack: frequencia.qtdPresentes,
          updated_by: frequencia.updated_by,
          Date: frequencia.Date,
          Hour: frequencia.Hour,
        };
        await FrequenciasHistoric.create(body);
      }
      return frequenciasToday.push({
        sala: frequencia.sala,
        msg: "Is not a valid turn",
        hour: frequencia.Hour,
      });
    });
    return res.json({ frequenciasToday });
  }
}

export default new LastFrequencyController();

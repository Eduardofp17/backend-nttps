import Frequencia from "../models/Frequencia";
import FrequenciasHistoric from "../models/LastFrequency";

class LastFrequencyController {
  async index(req, res) {
    try {
      const frequencias = await FrequenciasHistoric.findAll();

      return frequencias;
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create() {
    const dateNow = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    const frequencias = await Frequencia.findAll({ where: { Date: dateNow } });
    frequencias.map(async (frequencia) => {
      if (frequencia.Hour >= '07:00' && frequencia.Hour <= '08:50') {
        const frequenciaHistoric = await FrequenciasHistoric.findOne({
          where: {
            sala: frequencia.sala,
            Date: frequencia.Date,
          },
        });
        const body = {
          sala: frequencia.sala,
          breakfast: frequencia.qtdPresentes,
          updated_by: frequencia.updated_by,
          Date: frequencia.Date,
          Hour: frequencia.Hour,
        };
        if (frequenciaHistoric) {
          await frequenciaHistoric.update(body);
          return 1;
        }
        await FrequenciasHistoric.create(body);
      }
      if (frequencia.Hour >= '09:10' && frequencia.Hour <= '11:30') {
        const frequenciaHistoric = await FrequenciasHistoric.findOne({
          where: {
            sala: frequencia.sala,
            Date: frequencia.Date,
          },
        });
        const body = {
          sala: frequencia.sala,
          lunch: frequencia.qtdPresentes,
          updated_by: frequencia.updated_by,
          Date: frequencia.Date,
          Hour: frequencia.Hour,
        };
        if (frequenciaHistoric) {
          await frequenciaHistoric.update(body);
          return 1;
        }
        await FrequenciasHistoric.create(body);
      }
      if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
        const frequenciaHistoric = await FrequenciasHistoric.findOne({
          where: {
            sala: frequencia.sala,
            Date: frequencia.Date,
          },
        });
        const body = {
          sala: frequencia.sala,
          afternoonsnack: frequencia.qtdPresentes,
          updated_by: frequencia.updated_by,
          Date: frequencia.Date,
          Hour: frequencia.Hour,
        };
        if (frequenciaHistoric) {
          await frequenciaHistoric.update(body);
          return 1;
        }
        await FrequenciasHistoric.create(body);
      }
      return 1;
    });
    return 0;
  }
}

export default new LastFrequencyController();

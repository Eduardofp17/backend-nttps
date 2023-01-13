import FrequenciasHistoric from "../models/LastFrequency";

class LastFrequencyController {
  async index(req, res) {
    try {
      const frequencias = await FrequenciasHistoric.findAll();
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(frequencia) {
    if (frequencia.Hour >= '07:00' && frequencia.Hour <= '08:50') {
      const body = {
        sala: frequencia.sala,
        breakfast: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await FrequenciasHistoric.create(body);
    }
    if (frequencia.Hour >= '09:10' && frequencia.Hour <= '11:30') {
      const body = {
        sala: frequencia.sala,
        lunch: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await FrequenciasHistoric.create(body);
    }
    if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
      const body = {
        sala: frequencia.sala,
        afternoonsnack: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await FrequenciasHistoric.create(body);
    }
    return 'Is not a valid turn';
  }

  async update(frequencia) {
    const frequenciasHistoric = await FrequenciasHistoric.findOne({
      where: {
        sala: frequencia.sala,
        Date: frequencia.Date,
      },
    });
    if (frequencia.Hour >= '07:00' && frequencia.Hour <= '08:50') {
      const body = {
        sala: frequencia.sala,
        breakfast: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await frequenciasHistoric.update(body);
    }
    if (frequencia.Hour >= '09:10' && frequencia.Hour <= '11:30') {
      const body = {
        sala: frequencia.sala,
        lunch: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await frequenciasHistoric.update(body);
    }
    if (frequencia.Hour >= '13:00' && frequencia.Hour <= '14:40') {
      const body = {
        sala: frequencia.sala,
        afternoonsnack: frequencia.qtdPresentes,
        updated_by: frequencia.updated_by,
        Date: frequencia.Date,
        Hour: frequencia.Hour,
      };
      await frequenciasHistoric.update(body);
    }
    return 'Is not a valid turn';
  }
}

export default new LastFrequencyController();

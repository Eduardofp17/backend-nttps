import FrequenciasHistoric from "../models/LastFrequency";

class LastFrequencyController {
  async index(req, res) {
    try {
      const frequencias = await FrequenciasHistoric.findAll(
        { where: { school_id: req.user.School_id } },
      );
      return res.json(frequencias);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(frequencia) {
    const hour = new Date();
    if (this.isBetweenHours(hour, '07:00', '09:30')) {
      const body = {
        sala: frequencia.sala,
        breakfast: frequencia.qtd_presentes,
        updated_by: frequencia.updated_by,
        school_id: frequencia.school_id,
      };
      await FrequenciasHistoric.create(body);
    } else if (this.isBetweenHours(hour, '09:50', '11:30')) {
      const body = {
        sala: frequencia.sala,
        lunch: frequencia.qtd_presentes,
        updated_by: frequencia.updated_by,
        school_id: frequencia.school_id,
      };
      await FrequenciasHistoric.create(body);
    } else if (this.isBetweenHours(hour, '13:00', '14:40')) {
      const body = {
        sala: frequencia.sala,
        afternoonsnack: frequencia.qtd_presentes,
        updated_by: frequencia.updated_by,
        school_id: frequencia.school_id,
      };
      await FrequenciasHistoric.create(body);
    } else {
      return 'Is not a valid turn';
    }
  }

  async update(frequencia, qtd_presentes) {
    const frequenciasHistoric = await FrequenciasHistoric.findByPk(frequencia.id);
    const hour = new Date();
    if (frequenciasHistoric) {
      if (this.isBetweenHours(hour, '07:00', '09:30')) {
        await frequenciasHistoric.update({
          breakfast: Number(qtd_presentes),
        });
      } else if (this.isBetweenHours(hour, '09:50', '11:30')) {
        await frequenciasHistoric.update({
          lunch: Number(qtd_presentes),

        });
      } else if (this.isBetweenHours(hour, '13:00', '14:40')) {
        await frequenciasHistoric.update({
          afternoonsnack: Number(qtd_presentes),

        });
      } else {
        return 'Is not a valid turn';
      }
    } else {
      return 'Historic not found';
    }
  }

  isBetweenHours(time, startHour, endHour) {
    const timeWithoutSeconds = new Date(time);
    timeWithoutSeconds.setSeconds(0, 0);

    const startParts = startHour.split(':');
    const endParts = endHour.split(':');

    const startTime = new Date(timeWithoutSeconds);
    startTime.setHours(parseInt(startParts[0], 10), parseInt(startParts[1], 10));

    const endTime = new Date(timeWithoutSeconds);
    endTime.setHours(parseInt(endParts[0], 10), parseInt(endParts[1], 10));

    return timeWithoutSeconds >= startTime && timeWithoutSeconds <= endTime;
  }
}

export default new LastFrequencyController();

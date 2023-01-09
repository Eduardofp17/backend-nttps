import Cardapio from "../models/Cardapios";

class CardapioController {
  async index(req, res) {
    const cardapio = await Cardapio.findAll();
    return res.json(cardapio);
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(400).json({ error: 'Missing ID' });

      const cardapio = await Cardapio.findByPk(req.params.id);

      if (req.userLevel < 3) return res.status(401).json({ error: 'Permissão inválida' });
      await cardapio.update(req.body);

      return res.json({
        updated: true,
        theDoc: cardapio,
      });
    } catch (e) { return res.status(400).json("Um erro aconteceu"); }
  }
}

export default new CardapioController();

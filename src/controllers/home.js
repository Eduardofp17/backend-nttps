class HomeController {
  async index(req, res) {
    res.json("Nothing to see here");
  }
}

export default new HomeController();

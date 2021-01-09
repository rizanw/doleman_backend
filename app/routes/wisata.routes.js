const controller = require("../controllers/wisata.controller");
const crowdController = require("../controllers/crowd.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/wisata/all", controller.all);

  app.post("/api/wisata/nearby", controller.all);

  app.post("/api/wisata", controller.wisataBoard);

  app.post("/api/wisata/statistic", crowdController.today);
  app.post("/api/wisata/statistic/add", crowdController.incToday);
};

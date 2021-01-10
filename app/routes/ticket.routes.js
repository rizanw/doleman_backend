const { authJwt } = require("../middlewares");
const controller = require("../controllers/ticket.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ticket/my", controller.fetchAllByUser);
  app.post("/api/ticket/code", controller.fetchOneByCode);
  app.post("/api/ticket/buy", controller.buyTicket);
  app.post("/api/ticket/check", controller.checkTicket);
  app.post("/api/ticket/confirm", controller.confirmTicket);
};

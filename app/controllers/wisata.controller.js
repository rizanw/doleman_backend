const db = require("../models");
const Wisata = db.wisata;

exports.all = (req, res) => {
  Wisata.find({}, function (err, wisatas) {
    res.send({ wisatas: wisatas });
  });
};

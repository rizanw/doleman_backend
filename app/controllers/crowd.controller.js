const moment = require("moment");
const db = require("../models");
const Crowd = db.crowd;
const Wisata = db.wisata;

const today = moment().startOf("day");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

exports.today = (req, res) => {
  var query = {
      wisata: req.body.wisata,
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    },
    update = {
      $setOnInsert: {
        date: new Date(),
        wisata: req.body.wisata,
        in: 0,
        total: 0,
        capacity: 200 * getRandomInt(5),
      },
    },
    options = { upsert: true };

  Crowd.findOneAndUpdate(query, update, options, function (err, statistic) {
    res.send(statistic);
  });
};

exports.incToday = (req, res) => {
  var query = {
    wisata: req.body.wisata,
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  };
  var update = { $inc: { in: 1, total: 1 } };
  options = { upsert: true };

  Crowd.findOneAndUpdate(query, update, options, function (err, statistic) {
    var crowdedness = ((statistic.in + 1) / (statistic.capacity + 1)) * 100;
    Wisata.findOneAndUpdate(
      { _id: req.body.wisata },
      { crowdedness: crowdedness },
      {},
      function (err, wisata) {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }
      }
    );
    res.send(statistic);
  });
};

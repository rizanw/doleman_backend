const moment = require("moment");
const db = require("../models");
const Crowd = db.crowd;
const Wisata = db.wisata;

const today = moment().startOf("day");

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
        capacity: 2000,
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

  Crowd.findOneAndUpdate(query, update, {}, function (err, statistic) {
    var crowdedness = (statistic.in / statistic.capacity) * 100;
    Wisata.findOneAndUpdate(
      { _id: req.body.wisata },
      { crowdedness: crowdedness },
      {},
      function (err, wisata) {
        console.log(wisata);
      }
    );
    res.send(statistic);
  });
};

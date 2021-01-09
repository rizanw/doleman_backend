const moment = require("moment");
const db = require("../models");
const Crowd = db.crowd;

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
        wisata: req.body.wisata,
        date: new Date(),
        in: 0,
        out: 0,
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
  var update = { $inc: { in: 1 } };

  Crowd.findOneAndUpdate(query, update, {}, function (err, statistic) {
    res.send(statistic);
  });
};

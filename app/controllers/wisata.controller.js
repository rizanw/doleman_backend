const db = require("../models");
const Wisata = db.wisata;

exports.all = (req, res) => {
  Wisata.find({}, function (err, wisatas) {
    res.send(wisatas);
  });
};

exports.nearby = (req, res) => {
  var la = req.body.lat;
  var lo = req.body.long;

  Wisata.find(
    {
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lo, la],
          },
          $maxDistance: 10000,
        },
      },
    },
    function (err, wisatas) {
      res.send(wisatas);
    }
  );
};

exports.wisataBoard = (req, res) => {
  Wisata.findOne({ _id: req.body.id }, function (err, wisata) {
    res.send(wisata);
  });
};
 

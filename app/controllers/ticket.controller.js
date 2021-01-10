const db = require("../models");
const Ticket = db.ticket;
const User = db.user;
const Wisata = db.wisata;
const Crowd = db.crowd;
const crypto = require("crypto");
const moment = require("moment");

const today = moment().startOf("day");

exports.fetchAllByUser = (req, res) => {
  User.findOne({ email: req.body.user }, function (err, user) {
    if (err) {
      res.send({
        success: false,
        message: err,
      });
      return;
    }
    if (!user) {
      Ticket.find({ user: req.body.user })
        .populate("wisata")
        .exec(function (err, tickets) {
          if (err) {
            res.send({
              success: false,
              message: err,
            });
            return;
          }
          res.send(tickets);
          return;
        });
    } else {
      Ticket.find({ user: user._id })
        .populate("wisata")
        .exec(function (err, tickets) {
          if (err) {
            res.send({
              success: false,
              message: err,
            });
            return;
          }
          res.send(tickets);
          return;
        });
    }
  });
};

exports.fetchOneByCode = (req, res) => {
  Ticket.findOne({ code: req.body.code }, function (err, ticket) {
    res.send(ticket);
  });
};

exports.confirmTicket = (req, res) => {
  var query = {
    code: req.body.code,
  };
  var update = { status: req.body.status };

  Ticket.findOneAndUpdate(query, update, function (err, ticket) {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    res.send(ticket);
  });
};

exports.checkTicket = (req, res) => {
  var query = {
    code: req.body.code,
    wisata: req.body.wisata,
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  };
  var update = { status: "CHECKEDIN" };

  Ticket.findOneAndUpdate(query, update, function (err, ticket) {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }
    if (ticket == null) {
      res.send({
        success: false,
        message: "Periksa kembali tiket.",
      });
      return;
    }

    var query = {
      wisata: ticket.wisata,
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    };
    Crowd.findOneAndUpdate(
      query,
      { $inc: { in: 1, total: 1 } },
      { upsert: true },
      function (err, statistic) {
        var crowdedness = ((statistic.in + 1) / (statistic.capacity + 1)) * 100;
        Wisata.findOneAndUpdate(
          { _id: ticket.wisata },
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
        res.send({
          success: true,
          data: {
            wisata: statistic.wisata,
            date: statistic.date,
            in: statistic.in + 1,
            total: statistic.total + 1,
            capacity: statistic.capacity,
          },
          message: update,
        });
      }
    );
  });
};

exports.buyTicket = (req, res) => {
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();

  const ticket = new Ticket({
    code: code,
    date: req.body.date,
    quantity: req.body.quantity,
    price: req.body.price,
    status: req.body.status,
  });

  ticket.save((err, ticket) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    Wisata.findOne(
      {
        name: req.body.wisata,
      },
      (err, wisata) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }
        ticket.wisata = wisata._id;
      }
    );
    User.findOne(
      {
        email: req.body.user,
      },
      (err, user) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }
        ticket.user = user._id;
        ticket.save((err) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }
        });
      }
    );

    console.log(ticket);

    res.status(200).send({
      id: ticket._id,
      user: req.body.user,
      wisata: ticket.wisata,
      code: ticket.code,
      date: ticket.date,
      quantity: ticket.quantity,
      price: ticket.price,
      status: ticket.status,
      success: true,
      message: "buy succedd",
    });
  });
};

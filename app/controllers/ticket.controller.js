const db = require("../models");
const Ticket = db.ticket;
const User = db.user;
const Wisata = db.wisata;
const crypto = require("crypto");

exports.fetchAllByUser = (req, res) => {
  User.findOne({ email: req.body.user }, function (err, user) {
    if (!user) {
      Ticket.find({ user: req.body.user })
        .populate("wisata")
        .exec(function (err, tickets) {
          res.send(tickets);
        });
    } else {
      Ticket.find({ user: user._id })
        .populate("wisata")
        .exec(function (err, tickets) {
          res.send(tickets);
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
    res.send(ticket);
  });
};

exports.checkTicket = (req, res) => {
  var query = {
    code: req.body.code,
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  };
  var update = { status: req.body.status };

  Ticket.findOneAndUpdate(query, update, function (err, ticket) {
    res.send(ticket);
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

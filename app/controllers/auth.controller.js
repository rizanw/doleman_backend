const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: err,
      });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
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
    } else {
      Role.findOne({ name: "wisatawan" }, (err, role) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err,
          });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({
              success: false,
              message: err,
            });
            return;
          }
        });
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    var authorities = [];
    for (let i = 0; i < req.body.roles.length; i++) {
      authorities.push("ROLE_" + req.body.roles[i].toUpperCase());
    }

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
      success: true,
      message: "registered successfully!",
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email.toLowerCase(),
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          success: false,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token,
        success: true,
        message: "login successfully",
      });
    });
};

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.wisata = require("./wisata.model")(mongoose);
db.crowd = require("./crowd.model")(mongoose);
db.ticket = require("./ticket.model")(mongoose);

db.ROLES = ["wisatawan", "pengelola"];

module.exports = db;

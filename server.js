const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "wisatawan",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'wisatawan' to roles collection");
      });

      new Role({
        name: "pengelola",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'pengelola' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to doleman server. ssssssssttt.. its private!",
  });
});

//routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/wisata.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

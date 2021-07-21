const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();

app.options("*", cors());

app.use(morgan("combined"));
app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {
  res.send("success");
});

app.post("/signin", cors(), signin.handleSignIn(db, bcrypt));

app.post("/register", cors(), (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", cors(), profile.handleProfile(db));

app.put("/image", cors(), image.handleImage(db));

app.post("/imageUrl", cors(), (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log(`app is running on port 3000`);
});

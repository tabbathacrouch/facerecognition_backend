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

// const whitelist = ["http://localhost:3001"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log(`app is running on port 3000`);
});

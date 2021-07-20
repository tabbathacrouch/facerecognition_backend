const Clarifai = require("clarifai");
require("dotenv").config();
const app = new Clarifai.App({ apiKey: process.env.REACT_APP_API_KEY });

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("submissions", 1)
    .returning("submissions")
    .then((submissions) => {
      if (submissions.length) {
        res.json(submissions[0]);
      } else {
        res.status(400).json("not a registered user");
      }
    })
    .catch(() => {
      res.status(400).json("unable to get number of submissions");
    });
};

//if API is not working again, replace Clarifai.FACE_DETECT_MODEL with string 'fe995da8cb73490f8556416ecf25cea3'
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = { handleImage, handleApiCall };

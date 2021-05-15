const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters/:id", (req, res) => {
  console.log("now in /character/:id");
  console.log(req.params);
  let idCharacter = req.params.id;
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${idCharacter}?apiKey=TXgFLbDufrCAd1Fb`
      )
      .then((response) => {
        let results = response.data;
        res.json(results);
      });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

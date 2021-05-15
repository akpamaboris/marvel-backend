const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  console.log("route characters started");
  if (!req.query.page) {
    try {
      axios
        .get(
          `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.KEY}`
        )
        .then(function (response) {
          let results = response.data.results;
          res.json(results);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  let pageToconsult = req.query.page;

  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.KEY}`
      )
      .then(async function (response) {
        // console.log(response.data.results.length);
        let results = await response.data.results;
        // res.json(results);
        let numOfPages = Math.ceil(response.data.count / 100);

        let tabOfSearch = [];
        tabOfSearch.push(
          `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.KEY}`
        );
        for (let x = 1; x < numOfPages; x++) {
          let toSkip = x * 100;
          let searchurl = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.KEY}&skip=${toSkip}`;
          tabOfSearch.push(searchurl);
        }
        let urlToConsult = tabOfSearch[pageToconsult];
        console.log(urlToConsult);
        axios.get(urlToConsult).then(async function (response) {
          let finalresults = await response.data.results;
          res.json(finalresults);
        });
      });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

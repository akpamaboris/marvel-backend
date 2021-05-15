const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  console.log("route characters started");
  let pageToconsult = req.query.page;

  if (!req.query.page) {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.KEY}`
      )
      .then((response) => {
        let results = response.data.results;
        res.json(results);
      });
  }

  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.KEY}`
      )
      .then(async function (response) {
        // console.log(response.data.results.length);
        let results = await response.data.results;
        let numOfPages = Math.ceil(response.data.count / 100);
        console.log(numOfPages);

        let tabOfSearch = [];

        tabOfSearch.push(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.KEY}`
        );
        for (let x = 1; x < numOfPages; x++) {
          let toSkip = x * 100;
          let searchurl = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.KEY}&skip=${toSkip}`;
          tabOfSearch.push(searchurl);
        }
        let urlToConsult = tabOfSearch[pageToconsult];
        console.log(urlToConsult);
        axios.get(urlToConsult).then(function (response) {
          let finalresults = response.data.results;
          res.json(finalresults);
        });
      });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

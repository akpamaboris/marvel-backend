const axios = require("axios");
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");

const app = express();
app.use(cors());
app.use(formidable());

require("dotenv").config();

app.get("/characters", async (req, res) => {
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

app.get("/comics", async (req, res) => {
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

app.get("/", (req, res) => {
  console.log("now in /");
  res.send("<h1> Hello to Marvel API made by Zeli</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server started at port 4000");
});

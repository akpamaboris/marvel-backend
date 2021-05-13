const axios = require("axios");

// axios
//   .get(
//     "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=TXgFLbDufrCAd1Fb"
//   )
//   .then(function (response) {
//     console.log(response);
//     console.log(response.data.count);
//     console.log(response.data.count / 100);
//     console.log(Math.ceil(response.data.count / 100));

//     let numOfPages = Math.ceil(response.data.count / 100);

//     let tabOfSearch = [];
//     tabOfSearch.push(
//       "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=TXgFLbDufrCAd1Fb"
//     );
//     for (let x = 1; x < numOfPages; x++) {
//       let toSkip = x * 100;
//       let searchurl = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=TXgFLbDufrCAd1Fb&skip=${toSkip}`;
//       tabOfSearch.push(searchurl);
//     }

//     console.log(tabOfSearch);
//     console.log(tabOfSearch.length);
//     // console.log(response.data.results);
//   });

axios
  .get(
    "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=TXgFLbDufrCAd1Fb"
  )
  .then((response) => {
    console.log(response.data);
  });

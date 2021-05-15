const axios = require("axios");
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidable());

//import the routes
const charactersRoute = require("./routes/characters");
app.use(charactersRoute);

const comicsRoute = require("./routes/comics");
app.use(comicsRoute);

const charactersId = require("./routes/charactersId");
app.use(charactersId);

const login = require("./routes/login");
app.use(login);

const register = require("./routes/register");
app.use(register);
//--__--__--__

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

require("dotenv").config();

app.get("/", (req, res) => {
  console.log("now in /");

  res.send("<h1> Hello to Marvel API made by Zeli</h1>");
});

app.all("*", (req, res) => {
  console.log("no page found");
  res.json({ message: "No page found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started at port 4000");
});

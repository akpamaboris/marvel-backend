const User = require("../models/User");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/login", async (req, res) => {
  console.log("now in login");
  let email = req.fields.email;
  let password = req.fields.password;

  console.log(email);
  const findUser = await User.find({ email: email });
  if (
    findUser[0].hash === SHA256(password + findUser[0].salt).toString(encBase64)
  ) {
    res.json({
      message: "user have right password, user connected",
      token: findUser[0].token,
    });
  } else {
    res.json({ message: "wrong password" });
  }
});

module.exports = router;

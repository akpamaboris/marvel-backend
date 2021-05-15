const User = require("../models/User");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/register", async (req, res) => {
  console.log("now in Register");
  console.log(req.fields);

  try {
    const email = req.fields.email;
    const password = req.fields.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    const newUser = new User({
      email: email,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();
    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

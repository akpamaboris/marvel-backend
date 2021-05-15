const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  hash: String,
  token: String,
  salt: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

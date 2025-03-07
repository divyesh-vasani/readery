const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookshelves: { type: mongoose.Schema.Types.ObjectId, ref: "Bookshelf" }, // Reference to Bookshelf
});

module.exports = mongoose.model("User", userSchema);

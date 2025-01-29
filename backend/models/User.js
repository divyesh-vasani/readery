const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,  // Storing raw password (not secure, but for learning)
});

module.exports = mongoose.model("User", userSchema);

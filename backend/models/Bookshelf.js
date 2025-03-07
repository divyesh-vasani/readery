const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID from Google Books API
  title: { type: String, required: true },
  authors: { type: [String] },
  description: { type: String },
  categories: { type: [String] },
  thumbnail: { type: String }, // Image URL
});

const BookshelfSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
  bookshelves: {
    type: Object,
    default: {},
    of: [BookSchema], // ✅ Explicitly defines books following BookSchema
  },
});

module.exports = mongoose.model("Bookshelf", BookshelfSchema);

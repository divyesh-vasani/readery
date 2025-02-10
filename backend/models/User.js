const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    id: { type: String, required: true }, // ID from Google Books API
    title: { type: String, required: true },
    authors: { type: [String] },
    description: { type: String },
    categories: { type: [String] },
    thumbnail: { type: String }, // Image URL
  });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookshelves: [
        {
          category: { type: String, required: true }, // Category like 'fvt', 'want to read', etc.
          books: [BookSchema] // An array of books under each category
        }
      ]
});

module.exports = mongoose.model("User", userSchema);

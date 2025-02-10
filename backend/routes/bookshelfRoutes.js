const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { addBookToBookshelf, getUserBookshelves } = require("../controllers/bookshelfController");

// Add book to bookshelf (POST)
router.post("/add", authMiddleware, addBookToBookshelf);

// Get user's bookshelves (GET)
router.get("/", authMiddleware, getUserBookshelves);

module.exports = router;

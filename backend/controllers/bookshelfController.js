const User = require("../models/User"); // Import User model

// Add Book to Bookshelf
const addBookToBookshelf = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from token (decoded in middleware)
    console.log("UserId:", userId);
    const { book } = req.body; // Get book data & category (e.g., "favorites", "currentlyReading")
    console.log(book, "book");
    if (!book.id || !book.title) {
      return res
        .status(400)
        .json({ message: "Book id and title are required" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    console.log(user.bookshelves, "user");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isBookAlreadyAdded = user.bookshelves.some(
      (book) => book.id === book.id
    );
    console.log("Is Book Already Added?", isBookAlreadyAdded);

    if (isBookAlreadyAdded === true) {
      res.send("Book Already Added");
    } else {
      user.bookshelves.push({ books: [book] });
      await user.save(); // Save changes

      res.status(200).json({
        message: "Book added to bookshelf!",
        bookshelves: user.bookshelves,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Fetch User's Bookshelves
const getUserBookshelves = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ bookshelves: user.bookshelves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { addBookToBookshelf, getUserBookshelves };

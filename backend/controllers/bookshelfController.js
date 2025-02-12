const User = require("../models/User"); // Import User model

// Add Book to Bookshelf
const addBookToBookshelf = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from token (decoded in middleware)
    const { bookshelfName, book } = req.body; // Get bookshelf name (e.g., "Fvt") and book data
    if (!bookshelfName || !book || !book.id || !book.title) {
      return res.status(400).json({ message: "Bookshelf name, book id, and title are required" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the bookshelf exists, if not, create it
    if (!user.bookshelves[bookshelfName]) {
      user.bookshelves[bookshelfName] = []; // Create a new bookshelf if it doesn't exist
    }

    // Get the existing bookshelf
    const existingBookshelf = user.bookshelves[bookshelfName];

    // Check if the book already exists in the bookshelf
    const isBookAlreadyAdded = existingBookshelf.some((b) => b.id === book.id);

    if (isBookAlreadyAdded) {
      return res.status(400).json({ message: "Book already exists in the bookshelf!" });
    }

    // Add the book to the bookshelf
    existingBookshelf.push(book);
    await user.save(); // Save changes to the user document

    res.status(200).json({
      message: "Book added to bookshelf!",
      bookshelves: user.bookshelves,
    });

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

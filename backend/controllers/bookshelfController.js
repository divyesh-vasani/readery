const User = require("../models/User"); 
const Bookshelf = require("../models/Bookshelf");

// Add Book to Bookshelf
const addBookToBookshelf = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookshelfName, book } = req.body;

    if (!bookshelfName || !book || !book.id || !book.title) {
      return res.status(400).json({ message: "Bookshelf name, book ID, and title are required" });
    }

    // Find the user's bookshelf document
    let bookshelfDoc = await Bookshelf.findOne({ user: userId });

    if (!bookshelfDoc) {
      // If no Bookshelf document exists, create one
      bookshelfDoc = new Bookshelf({
        user: userId,
        bookshelves: { [bookshelfName]: [book] }, // Create first bookshelf with book
      });

      await bookshelfDoc.save();

      // Link the Bookshelf to the User document (store reference)
      await User.findByIdAndUpdate(userId, { bookshelves: bookshelfDoc._id });
    } else {
      // Ensure bookshelves is initialized
      if (!bookshelfDoc.bookshelves) {
        bookshelfDoc.bookshelves = {};
      }

      // If the bookshelf does not exist, create it
      if (!bookshelfDoc.bookshelves[bookshelfName]) {
        bookshelfDoc.bookshelves[bookshelfName] = [];
      }

      // Check if book already exists
      const existingBooks = bookshelfDoc.bookshelves[bookshelfName];
      const isBookAlreadyAdded = existingBooks.some((b) => b.id === book.id);

      if (isBookAlreadyAdded) {
        return res.status(400).json({ message: "Book already exists in the bookshelf!" });
      }

      // Add book to the bookshelf
      existingBooks.push(book);
      bookshelfDoc.bookshelves[bookshelfName] = existingBooks;

      // ✅ Mark bookshelves as modified so Mongoose detects changes
      bookshelfDoc.markModified("bookshelves");

      await bookshelfDoc.save();
    }

    res.status(200).json({
      message: "Book added to bookshelf!",
      bookshelves: bookshelfDoc.bookshelves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Fetch User's Bookshelves
const getUserBookshelves = async (req, res) => {
  try {
    const userId = req.user.userId;
    let bookshelfDoc = await Bookshelf.findOne({ user: userId });
    console.log(bookshelfDoc.bookshelves,"bookshelfDoc----")
    if (!userId) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ bookshelves: bookshelfDoc.bookshelves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { addBookToBookshelf, getUserBookshelves };

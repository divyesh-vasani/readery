const User = require("../models/User"); // Import User model

// Add Book to Bookshelf
const addBookToBookshelf = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookshelfName, book } = req.body;

    if (!bookshelfName || !book || !book.id || !book.title) {
      return res.status(400).json({ message: "Bookshelf name, book id, and title are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Ensure bookshelves object exists
    if (!user.bookshelves) {
      user.bookshelves = {};
    }

    // ✅ Ensure the specific bookshelf exists
    if (!user.bookshelves[bookshelfName]) {
      user.bookshelves[bookshelfName] = [];
    } 

    const isBookAlreadyAdded = user?.bookshelves[bookshelfName].some((b) => b.id === book.id);

    console.log(isBookAlreadyAdded,"isBookAlreadyAdded")

    if (isBookAlreadyAdded) {
      return res.status(400).json({ message: "Book already exists in a bookshelf!" });
    }

    user.bookshelves[bookshelfName].push(book);

    // 🔥 Explicitly mark `bookshelves` as modified
    user.markModified("bookshelves");

    // ✅ Save the changes
    await user.save();

    const updatedUser = await User.findById(userId);

    res.status(200).json({
      message: "Book added to bookshelf!",
      bookshelves: updatedUser.bookshelves, // Return updated bookshelves
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

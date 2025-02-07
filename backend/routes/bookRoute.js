const express = require('express');
const router = express.Router();
const { searchBooks, getBookById } = require('../controllers/googleBooks');

router.get('/search', async (req, res) => {
  const { query } = req.query; 
  if (!query) return res.status(400).json({ message: 'Query parameter is required' });

  try {
    const books = await searchBooks(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await getBookById(bookId);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

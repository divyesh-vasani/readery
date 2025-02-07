const axios = require('axios');

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 

const searchBooks = async (query) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: query,
        key: GOOGLE_API_KEY,
      },
    });
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    throw new Error('Error fetching books');
  }
};

const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}/${bookId}`, {
      params: {
        key: GOOGLE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching book details from Google Books API:', error);
    throw new Error('Error fetching book details');
  }
};

module.exports = {
  searchBooks,
  getBookById,
};

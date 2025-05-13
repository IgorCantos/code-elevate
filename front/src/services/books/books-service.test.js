import axios from 'axios';
import {
  getAllBooks,
  getRecentlyViewedBooks,
  postRecentlyViewedBook,
  getBooksByAuthor,
  getBooksByGenre,
} from './books-service';

jest.mock('axios');

describe('Books Service', () => {
  const baseUrl = 'http://localhost:8080';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('fetch all books with pagination', async () => {
      const mockResponse = { data: { books: [], total: 0 } };
      axios.get.mockResolvedValue(mockResponse);

      const page = 1;
      const itemsPerPage = 10;
      const result = await getAllBooks(page, itemsPerPage);

      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/v1/books?page=${page}&limit=${itemsPerPage}`,
        { headers: { page, limit: itemsPerPage } }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getRecentlyViewedBooks', () => {
    it('fetch recently viewed books for a mocked user', async () => {
      const mockResponse = { data: { books: [] } };
      axios.get.mockResolvedValue(mockResponse);

      const result = await getRecentlyViewedBooks();

      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/v1/users/123/recently-viewed`);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('postRecentlyViewedBook', () => {
    it('post a recently viewed book for a mocked user', async () => {
      const mockResponse = { data: { success: true } };
      const book = { id: '1', title: 'Test Book' };
      axios.post.mockResolvedValue(mockResponse);

      const result = await postRecentlyViewedBook(book);

      expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/v1/users/123/recently-viewed`, book);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getBooksByAuthor', () => {
    it('fetch books by a specific author with pagination', async () => {
      const mockResponse = { data: { books: [] } };
      const page = 1;
      const itemsPerPage = 10;
      const author = 'John Doe';
      axios.get.mockResolvedValue(mockResponse);

      const result = await getBooksByAuthor(page, itemsPerPage, author);

      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/v1/books/author/${author}?page=${page}&limit=${itemsPerPage}`,
        { headers: { page, limit: itemsPerPage } }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getBooksByGenre', () => {
    it('fetch books by a specific genre with pagination', async () => {
      const mockResponse = { data: { books: [] } };
      const page = 1;
      const itemsPerPage = 10;
      const genre = 'Fiction';
      axios.get.mockResolvedValue(mockResponse);

      const result = await getBooksByGenre(page, itemsPerPage, genre);

      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/v1/books/genre/${genre}?page=${page}&limit=${itemsPerPage}`,
        { headers: { page, limit: itemsPerPage } }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});

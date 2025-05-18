import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookStoreView from './book-store-view';
import * as booksService from 'src/services/books/books-service';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock('./recently-viewed-books', () => () => (
  <div data-testid="recently-viewed">Recently Viewed</div>
));
jest.mock('../error/error-view', () => ({ title, subtitle, buttonText, onButtonClick }) => (
  <div data-testid="error-view">
    <h1>{title}</h1>
    <button onClick={onButtonClick}>{buttonText}</button>
  </div>
));
jest.mock('./book-store-view-loading', () => () => (
  <div data-testid="loading-skeleton">Loading...</div>
));

describe('BookStoreView', () => {
  const mockBooks = Array.from({ length: 3 }).map((_, i) => ({
    _id: `book-${i}`,
    title: `Book ${i + 1}`,
    thumbnail: `url-to-thumbnail-${i}`,
    averageRating: 4,
    amount: 39.9,
    author: `Author-${i}`,
  }));

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(booksService, 'getBooks').mockResolvedValue({
      data: mockBooks,
      totalDocuments: 3,
      totalPages: 1,
    });

    jest.spyOn(booksService, 'getBooksByGenre').mockResolvedValue({
      data: mockBooks,
      totalDocuments: 3,
      totalPages: 1,
    });

    jest.spyOn(booksService, 'getBooksByAuthor').mockResolvedValue({
      data: mockBooks,
      totalDocuments: 3,
      totalPages: 1,
    });

    jest.spyOn(booksService, 'getRecentlyViewedBooks').mockResolvedValue([]);
  });

  test('renders loading skeleton initially', async () => {
    render(<BookStoreView />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
    });
  });

  test('renders book list after fetch', async () => {
    render(<BookStoreView />);
    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });
    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test('displays error view if book fetch fails', async () => {
    booksService.getBooks.mockRejectedValueOnce(new Error('API Error'));
    render(<BookStoreView />);
    await waitFor(() => {
      expect(screen.getByTestId('error-view')).toBeInTheDocument();
    });
  });

  test('shows recently viewed books if available', async () => {
    booksService.getRecentlyViewedBooks.mockResolvedValueOnce(mockBooks);
    render(<BookStoreView />);
    await waitFor(() => {
      expect(screen.getByTestId('recently-viewed')).toBeInTheDocument();
    });
  });

  test('can filter books by genre', async () => {
    render(<BookStoreView />);
    await waitFor(() => screen.getByText('Fiction'));
    fireEvent.click(screen.getByTestId('categories-button-Fiction'));
    expect(await screen.findByText('Resultados para gênero: Fiction')).toBeInTheDocument();
  });

  test('can filter books by author', async () => {
    render(<BookStoreView />);
    await waitFor(() => screen.getByText('Author-0'));
    fireEvent.click(screen.getByTestId('author-btn-0'));
    expect(await screen.findByText('Resultados para autor: Author-0')).toBeInTheDocument();
  });

  test('navigates to page 2 when pagination is clicked', async () => {
    booksService.getBooks.mockResolvedValueOnce({
      data: Array.from({ length: 12 }, (_, i) => ({
        _id: `book-page1-${i}`,
        title: `Book Page 1 - ${i}`,
        thumbnail: `thumb-${i}.jpg`,
      })),
      totalDocuments: 24,
      totalPages: 2,
    });

    render(<BookStoreView />);

    await waitFor(() => {
      expect(screen.getByText('Book Page 1 - 0')).toBeInTheDocument();
    });

    booksService.getBooks.mockResolvedValueOnce({
      data: Array.from({ length: 12 }, (_, i) => ({
        _id: `book-page2-${i}`,
        title: `Book Page 2 - ${i}`,
        thumbnail: `thumb2-${i}.jpg`,
      })),
      totalDocuments: 24,
      totalPages: 2,
    });

    fireEvent.click(screen.getByLabelText('Go to page 2'));

    await waitFor(() => {
      expect(screen.getByText('Book Page 2 - 0')).toBeInTheDocument();
    });
  });

  test('clears author search and resets page to 1', async () => {
    render(<BookStoreView />);

    await waitFor(() => screen.getByText('Author-0'));
    fireEvent.click(screen.getByTestId('author-btn-0'));
    expect(await screen.findByText('Resultados para autor: Author-0')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('CancelIcon'));

    await waitFor(() => {
      expect(screen.queryByText('Resultados para autor: Author-0')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });
  });

  test('clears genre search and resets page to 1', async () => {
    render(<BookStoreView />);

    await waitFor(() => screen.getByText('Fiction'));
    fireEvent.click(screen.getByTestId('categories-button-Fiction'));
    expect(await screen.findByText('Resultados para gênero: Fiction')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('CancelIcon'));

    await waitFor(() => {
      expect(screen.queryByText('Resultados para gênero: Fiction')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
    });
  });
});

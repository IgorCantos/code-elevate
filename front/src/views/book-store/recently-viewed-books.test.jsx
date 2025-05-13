import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentlyViewedBooks from './recently-viewed-books';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockBooks = Array.from({ length: 1 }).map((_, index) => ({
  _id: `book-${index}`,
  title: `Book Title ${index}`,
  thumbnail: `https://example.com/cover-${index}.jpg`,
}));

describe('RecentlyViewedBooks', () => {
  it('render recently viewed book thumbnails', () => {
    render(
      <BrowserRouter>
        <RecentlyViewedBooks books={mockBooks} />
      </BrowserRouter>
    );

    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails.length).toBeLessThanOrEqual(7);
  });

  it('renders the section title', () => {
    render(
      <BrowserRouter>
        <RecentlyViewedBooks books={mockBooks} />
      </BrowserRouter>
    );

    expect(screen.getByText('Visualizados recentemente')).toBeInTheDocument();
  });

  it('navigates when a book thumbnail is clicked', () => {
    render(
      <BrowserRouter>
        <RecentlyViewedBooks books={mockBooks} />
      </BrowserRouter>
    );

    const firstThumbnail = screen.getByTestId('book-thumbnail-0');
    fireEvent.click(firstThumbnail);

    expect(mockNavigate).toHaveBeenCalledWith('/books/book-0', {
      state: mockBooks[0],
    });
  });
});

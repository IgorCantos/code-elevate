import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookDetailPage from './book-detail-view';
import { postRecentlyViewedBook } from 'src/services/books/books-service';

jest.mock('src/services/books/books-service', () => ({
  postRecentlyViewedBook: jest.fn(),
}));

describe('BookDetailPage', () => {
  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    thumbnail: 'test-thumbnail.jpg',
    amount: 100,
    currencyCode: 'BRL',
    averageRating: 4.5,
    publishedDate: '2023-01-01',
    description: 'Test description',
    genre: 'Fiction',
    pageCount: 300,
  };

  const renderWithRouter = (state) => {
    render(
      <MemoryRouter initialEntries={[{ state }]}>
        <Routes>
          <Route path="/" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders "Livro não encontrado" when no book is provided', () => {
    renderWithRouter(null);
    expect(screen.getByText('Livro não encontrado.')).toBeInTheDocument();
  });

  it('renders book details when a book is provided', () => {
    renderWithRouter(mockBook);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`Autor: ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByText('(4.5 estrelas)')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Gênero: Fiction | Páginas: 300')).toBeInTheDocument();
  });

  it('calls postRecentlyViewedBook when a book is provided', () => {
    renderWithRouter(mockBook);
    expect(postRecentlyViewedBook).toHaveBeenCalledWith(mockBook);
  });

  it('renders the "Comprar agora" button', () => {
    renderWithRouter(mockBook);
    expect(screen.getByRole('button', { name: 'Comprar agora' })).toBeInTheDocument();
  });

  it('renders the "Voltar" button', () => {
    renderWithRouter(mockBook);
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
  });
});

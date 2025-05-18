import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AsynchronousSearch from './search-input';
import { useNavigate } from 'react-router-dom';
import { getBestSellersBooks, getBooks } from 'src/services/books/books-service';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('src/services/books/books-service', () => ({
  getBestSellersBooks: jest.fn(),
  getBooks: jest.fn(),
}));

const bestSellersMock = [
  { _id: '1', title: 'Best Seller 1', thumbnail: 'thumb1.jpg' },
  { _id: '2', title: 'Best Seller 2', thumbnail: 'thumb2.jpg' },
];

const searchResultsMock = [
  { _id: '3', title: 'Search Book 1', thumbnail: 'thumb3.jpg' },
  { _id: '4', title: 'Search Book 2', thumbnail: 'thumb4.jpg' },
];

describe('AsynchronousSearch', () => {
  let navigateMock;

  beforeEach(async () => {
    jest.clearAllMocks();
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    getBestSellersBooks.mockResolvedValue({ data: bestSellersMock });
    getBooks.mockResolvedValue({ data: searchResultsMock });
  });

  it('renders input and placeholder', async () => {
    render(<AsynchronousSearch />);
    expect(screen.getByPlaceholderText(/Pesquisar livros/i)).toBeInTheDocument();
    await waitFor(() => expect(getBestSellersBooks).toHaveBeenCalled());
  });

  it('shows best sellers when opened and input is empty', async () => {
    render(<AsynchronousSearch />);
    const comboBox = await screen.findByRole('combobox');
    fireEvent.focus(comboBox);
    fireEvent.mouseDown(comboBox);

    expect(await screen.findByText('⭐ Top 20 livros')).toBeInTheDocument();

    expect(screen.getByText('Best Seller 1')).toBeInTheDocument();
    expect(screen.getByText('Best Seller 2')).toBeInTheDocument();
  });

  it('shows search results when input length > 1', async () => {
    render(<AsynchronousSearch />);
    const input = await screen.findByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Search' } });
    fireEvent.mouseDown(input);

    expect(await screen.findByText('Resultados da busca')).toBeInTheDocument();
    expect(await screen.findByText('Search Book 1')).toBeInTheDocument();
    expect(await screen.findByText('Search Book 2')).toBeInTheDocument();
  });

  it('navigates to book page on option select', async () => {
    render(<AsynchronousSearch />);

    const input = await screen.findByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Search' } });
    fireEvent.mouseDown(input);

    const option = await screen.findByText('Search Book 1');
    fireEvent.click(option);
    expect(navigateMock).toHaveBeenCalledWith('/books/3', expect.any(Object));
  });

  it('clears options when input is cleared', async () => {
    render(<AsynchronousSearch />);

    const input = await screen.findByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Search' } });
    fireEvent.mouseDown(input);

    expect(await screen.findByText('Search Book 1')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });

    expect(screen.queryByText('Search Book 1')).not.toBeInTheDocument();
  });
});

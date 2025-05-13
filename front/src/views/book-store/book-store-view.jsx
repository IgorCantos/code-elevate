import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material/';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Grid,
  Pagination,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  getAllBooks,
  getBooksByAuthor,
  getBooksByGenre,
  getRecentlyViewedBooks,
} from 'src/services/books/books-service';
import BookSkeletonList from './book-store-view-loading';
import RecentlyViewedBooks from './recently-viewed-books';
import ErrorView from '../error/error-view';

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  'Fiction',
  'History',
  'Science',
  'Self-Help',
  'Art',
  'Philosophy',
  'Biography',
  'Education',
  'Health',
  'Technology',
];

export default function BookStoreView() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingRecentlyViewedBooks, setIsFetchingRecentlyViewedBooks] = useState(true);

  const [page, setPage] = useState(1);

  const [booksList, setBooksList] = useState({});
  const [recentlyViewedBooks, setRecentlyViewedBooks] = useState([]);

  const [authorPage, setAuthorPage] = useState(1);
  const [authorSearch, setAuthorSearch] = useState('');

  const [genrePage, setGenrePage] = useState(1);
  const [genreSearch, setGenreSearch] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setError(false);
      setIsLoading(true);
      const data = await getAllBooks(page, ITEMS_PER_PAGE);
      const { data: books, totalDocuments, totalPages } = data;
      setBooksList({ books, totalDocuments, totalPages });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  async function fetchRecentlyViewedBooks() {
    try {
      setError(false);
      setIsFetchingRecentlyViewedBooks(true);
      const data = await getRecentlyViewedBooks();

      setRecentlyViewedBooks(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsFetchingRecentlyViewedBooks(false);
    }
  }

  const fetchBooksByAuthor = useCallback(
    async (author) => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getBooksByAuthor(authorPage, ITEMS_PER_PAGE, author);
        const { data: books, totalDocuments, totalPages } = data;
        setBooksList({ books, totalDocuments, totalPages });
        setAuthorSearch(author);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [authorPage]
  );

  const fetchBooksByGenre = useCallback(
    async (genre) => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getBooksByGenre(genrePage, ITEMS_PER_PAGE, genre);
        const { data: books, totalDocuments, totalPages } = data;
        setBooksList({ books, totalDocuments, totalPages });
        setGenreSearch(genre);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [genrePage]
  );

  useEffect(() => {
    if (!authorSearch && !genreSearch) {
      fetchBooks();
    }
  }, [fetchBooks, authorSearch, genreSearch]);

  useEffect(() => {
    fetchRecentlyViewedBooks();
  }, []);

  useEffect(() => {
    if (authorSearch) {
      fetchBooksByAuthor(authorSearch);
    }
  }, [authorSearch, authorPage, fetchBooksByAuthor]);

  useEffect(() => {
    if (genreSearch) {
      fetchBooksByGenre(genreSearch);
    }
  }, [genreSearch, genrePage, fetchBooksByGenre]);

  const handlePageChange = (_event, value) => {
    if (authorSearch) {
      setAuthorPage(value);
    } else if (genreSearch) {
      setGenrePage(value);
    } else {
      setPage(value);
    }
  };

  const handleCleanAuthorSearch = () => {
    setAuthorSearch('');
    setPage(1);
  };

  const handleCleanGenreSearch = () => {
    setGenreSearch('');
    setPage(1);
  };

  const { totalPages, books: paginatedBooks } = booksList;

  return (
    <Container sx={{ py: 4 }} maxWidth={false}>
      {error ? (
        <ErrorView
          title="Erro ao carregar livros"
          subtitle="Ocorreu um erro ao carregar os livros. Por favor, tente novamente."
          buttonText="Tentar novamente"
          onButtonClick={() => {
            setError(false);
            fetchBooks();
          }}
        />
      ) : (
        <Grid container spacing={4}>
          {isLoading ? (
            <BookSkeletonList />
          ) : (
            <>
              <Grid item xs={12} md={2}>
                <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Gênero
                  </Typography>

                  {CATEGORIES.map((categorie) => (
                    <Box key={categorie}>
                      <Button
                        variant="text"
                        size="small"
                        sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
                        data-testid={`categories-button-${categorie}`}
                        onClick={() => {
                          setGenreSearch(categorie);
                          setGenrePage(1);
                          setAuthorSearch('');
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ cursor: 'pointer' }} gutterBottom>
                          {categorie}
                        </Typography>
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={10}>
                <>
                  {!isFetchingRecentlyViewedBooks && recentlyViewedBooks.length > 0 && (
                    <RecentlyViewedBooks books={recentlyViewedBooks} />
                  )}

                  <Box mb={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
                      {(() => {
                        if (authorSearch) return `Resultados para autor: ${authorSearch}`;
                        if (genreSearch) return `Resultados para gênero: ${genreSearch}`;
                        return 'Para você';
                      })()}
                    </Typography>

                    {authorSearch && (
                      <Chip
                        label={authorSearch}
                        onDelete={handleCleanAuthorSearch}
                        color="primary"
                        sx={{ mb: 2 }}
                        data-testid="clear-author-search"
                      />
                    )}

                    {genreSearch && (
                      <Chip
                        label={genreSearch}
                        onDelete={handleCleanGenreSearch}
                        color="primary"
                        sx={{ mb: 2 }}
                        data-testeid="clear-genre-search"
                      />
                    )}
                  </Box>
                  <Grid
                    container
                    spacing={2}
                    sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}
                  >
                    {paginatedBooks?.map((book, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card
                          sx={{
                            border: '1px solid #F4F0F0',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            py: 3,
                          }}
                        >
                          <Box px={3} textAlign="center">
                            <CardMedia
                              component="img"
                              image={book.thumbnail}
                              alt={book.title}
                              sx={{
                                maxWidth: 150,
                                maxHeight: 210,
                                mx: 'auto',
                                borderRadius: '20px',
                                mb: 2,
                                cursor: 'pointer',
                              }}
                              onClick={() => navigate(`/books/${book._id}`, { state: book })}
                            />
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                cursor: 'pointer',
                              }}
                              onClick={() => navigate(`/books/${book._id}`, { state: book })}
                            >
                              {book.title}
                            </Typography>

                            <Button
                              variant="text"
                              size="small"
                              sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
                              onClick={() => {
                                setAuthorSearch(book.author);
                                setAuthorPage(1);
                              }}
                              data-testid={`author-btn-${index}`}
                            >
                              <Typography sx={{ cursor: 'pointer' }}>{book.author}</Typography>
                            </Button>

                            <Box
                              mt={1}
                              onClick={() => navigate(`/books/${book._id}`, { state: book })}
                            >
                              <Rating value={book.averageRating} readOnly size="small" />

                              <Typography variant="body1" fontWeight="bold">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(book.amount)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              px: 3,
                              mt: 1,
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <Tooltip title="Adicionar aos favoritos" arrow>
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: 4,
                                  px: 1,
                                  borderRadius: '30px',
                                  borderColor: 'red',
                                }}
                              >
                                <FavoriteBorder sx={{ color: 'red' }} />
                              </Button>
                            </Tooltip>
                            <Button
                              variant="contained"
                              startIcon={<AddShoppingCart />}
                              fullWidth
                              sx={{
                                flex: 1,
                                textTransform: 'none',
                                borderRadius: '15px',
                                backgroundColor: '#cc0000',
                                '&:hover': {
                                  backgroundColor: '#900',
                                },
                              }}
                            >
                              <Typography variant="body2">Adicionar</Typography>
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                      count={totalPages || 1}
                      page={authorSearch ? authorPage : page}
                      onChange={handlePageChange}
                    />
                  </Box>
                </>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Container>
  );
}

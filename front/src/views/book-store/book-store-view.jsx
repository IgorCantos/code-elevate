import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material/';
// import Slider from 'react-slick';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { getAllBooks } from 'src/services/books/books-service';
import BookSkeletonList from './book-store-view-loading';

const ITEMS_PER_PAGE = 12;

export default function BookStoreView() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [booksList, setBooksList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const data = await getAllBooks();

        const { data: books, totalDocuments, totalPages } = data;

        setBooksList({ books, totalDocuments, totalPages });
      } catch (err) {
        // setError(err.message || 'Erro ao carregar livros'); // FIX
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchBooks();
    }, 500);
  }, []);

  const handlePageChange = (_event, value) => {
    setPage(value);
  };

  const { totalPages } = booksList;
  const paginatedBooks = booksList?.books?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // const carouselSettings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   arrows: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 2,
  //   responsive: [
  //     {
  //       breakpoint: 960,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //   ],
  // };

  return (
    <Container sx={{ py: 4 }}>
      {isLoading ? (
        <BookSkeletonList />
      ) : (
        <>
          {/* <Box mb={4}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Visualizados recentemente
            </Typography>
            <Slider {...carouselSettings}>
              {books.slice(0, 8).map((book, index) => (
                <Box key={index} px={1}>
                  <Card sx={{ width: 120, border: 'none', boxShadow: 'none' }}>
                    <CardMedia
                      component="img"
                      image={book.thumbnail}
                      alt={book.title}
                      sx={{
                        maxWidth: 150,
                        mx: 'auto',
                        borderRadius: '20px',
                      }}
                    />
                  </Card>
                </Box>
              ))}
            </Slider>
          </Box> */}

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Para você
          </Typography>

          <Grid container spacing={2}>
            {paginatedBooks?.map((book, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  sx={{
                    border: '1px solid #F4F0F0',
                    borderRadius: '20px',
                    boxShadow: 'none',
                    py: 3,
                    cursor: 'pointer',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={book.thumbnail}
                    alt={book.title}
                    sx={{
                      maxWidth: 150,
                      maxHeight: 210,
                      mx: 'auto',
                      borderRadius: '20px',
                    }}
                  />
                  <Box
                    px={3}
                    mt={2}
                    textAlign="center"
                    onClick={() => navigate(`/books/${book._id}`, { state: book })}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {book.authors}
                    </Typography>

                    <Box mt={1}>
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
                        sx={{ minWidth: 4, px: 1, borderRadius: '30px', borderColor: 'red' }}
                      >
                        <FavoriteBorder sx={{ color: 'red' }} />
                      </Button>
                    </Tooltip>
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCart />}
                      fullWidth
                      sx={{ flex: 1, textTransform: 'none', borderRadius: '15px' }}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        Adicionar
                      </Typography>
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
          </Box>
        </>
      )}
    </Container>
  );
}

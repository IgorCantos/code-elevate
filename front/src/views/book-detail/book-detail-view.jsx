import { Box, Button, Container, Grid, Rating, Typography, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postRecentlyViewedBook } from 'src/services/books/books-service';
import { ArrowBackIos } from '@mui/icons-material/';

export default function BookDetailPage() {
  const location = useLocation();
  const book = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      postRecentlyViewedBook(book);
    }
  }, [book]);

  if (!book) {
    return <Typography>Livro não encontrado.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Grid>
        <Grid item xs={12}>
          <Box>
            <Button
              variant="text"
              size="large"
              startIcon={<ArrowBackIos />}
              sx={{
                mb: 2,
                textTransform: 'none',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
                p: 0,
              }}
              onClick={() => navigate('/')}
            >
              Voltar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Paper
              elevation={3}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                boxShadow: 'none',
                p: 2,
              }}
            >
              <Box
                component="img"
                src={book.thumbnail}
                alt={book.title}
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                boxShadow: 'none',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: book.currencyCode || 'BRL',
                }).format(book.amount)}
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  backgroundColor: '#cc0000',
                  '&:hover': {
                    backgroundColor: '#900',
                  },
                }}
              >
                Comprar agora
              </Button>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              boxShadow: 'none',
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {book.title}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Autor: {book.author}
            </Typography>

            <Box display="flex" alignItems="center" mb={1}>
              <Rating value={book.averageRating} precision={0.5} readOnly />
              <Typography variant="body2" ml={1}>
                ({book.averageRating} estrelas)
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Publicado em: {new Date(book.publishedDate).toLocaleDateString()}
            </Typography>

            <Typography variant="body1" mb={3} lineHeight={1.7}>
              {book.description}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Gênero: {book.genre} | Páginas: {book.pageCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

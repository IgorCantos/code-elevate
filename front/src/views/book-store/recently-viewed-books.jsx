import { Box, Card, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

export default function RecentlyViewedBooks({ books }) {
  const navigate = useNavigate();

  const carouselSettings = {
    centerMode: false,
    draggable: true,
    autoplay: true,
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box mb={4} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Visualizados recentemente
      </Typography>

      <Slider {...carouselSettings}>
        {books.slice(0, 7).map((book, index) => (
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
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/books/${book._id}`, { state: book })}
              />
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

RecentlyViewedBooks.propTypes = {
  books: PropTypes.array,
};

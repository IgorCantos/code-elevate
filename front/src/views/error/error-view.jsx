import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function ErrorView({
  title,
  subtitle,
  buttonIcon,
  buttonText,
  onButtonClick,
  isLoading,
}) {
  return (
    <Container>
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          display: 'flex',
          minHeight: '75vh',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>{subtitle}</Typography>

        <Button
          onClick={onButtonClick}
          size="large"
          variant="contained"
          startIcon={isLoading ? <CircularProgress size={25} /> : buttonIcon}
          sx={{
            my: { sm: 3 },
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : <>{buttonText}</>}
        </Button>

        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          sx={{
            mx: 'auto',
            pt: 3,
            height: 260,
          }}
        />
      </Box>
    </Container>
  );
}

ErrorView.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  buttonIcon: PropTypes.any,
  buttonText: PropTypes.any,
  onButtonClick: PropTypes.any,
  isLoading: PropTypes.any,
};

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function StoreView() {
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
          ola
        </Typography>
      </Box>
    </Container>
  );
}

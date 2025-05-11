import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Header from '../components/header';

export default function AppLayout({ children, sx, ...other }) {
  const SPACING = 8;

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            py: `${64 + SPACING}px`,

            ...sx,
          }}
          {...other}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

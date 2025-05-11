import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import AccountPopover from './account-popover';

export default function Header({ onOpenNav, children }) {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: 64,
        zIndex: theme.zIndex.appBar + 1,

        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* search aqui */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
  children: PropTypes.any,
};

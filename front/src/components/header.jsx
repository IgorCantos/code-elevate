import React from 'react';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import AccountPopover from './account-popover';
import AsynchronousSearch from './search-input';

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        backgroundColor: '#cc0000',
        boxShadow: 'none',
        height: 64,
        zIndex: theme.zIndex.appBar + 1,
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
        <Box
          component="img"
          src="/assets/f1rst-books-logo.png"
          alt="F1rst Books Logo"
          sx={{ height: 40 }}
        />

        <AsynchronousSearch />

        <Stack direction="row" alignItems="center" spacing={1}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

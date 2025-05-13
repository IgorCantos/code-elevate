import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

export default function AccountPopover() {
  return (
    <IconButton
      sx={{
        width: 40,
        height: 40,
      }}
    >
      <Avatar
        src=""
        alt="Igor"
        sx={{
          width: 36,
          height: 36,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      >
        {'Igor'.charAt(0).toUpperCase()}
      </Avatar>
    </IconButton>
  );
}

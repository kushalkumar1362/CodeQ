import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { Grow } from '@mui/material';

export const CustomMenu = styled((props) => {
  const theme = useTheme();
  return (
    <Menu
      {...props}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: theme.transitions.duration.standard }}
    />
  );
})(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: 'rgb(35, 49, 56)',
    color: 'rgb(233, 237, 239)',
    '& .MuiMenu-list': {
      padding: '8px 0',
      '& .MuiMenuItem-root': {
        fontSize: '15px',
        padding: '8px 20px',
        fontWeight: 400,
        transition: 'background-color 150ms ease-in-out',
        '&:hover': {
          backgroundColor: alpha('#182229', 1),
        },
      },
    },
  },
}));


import React from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import useUserContext from '../../hooks/useUserContext';

const UserHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentUser } = useUserContext();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: '#1b1b25',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: '40px',
          width: '240px',
          padding: 'px 12px',
          display: 'flex',
          gap: '12px',
          textTransform: 'none',
          fontSize: 20,
        }}
      >
        <Avatar alt="Remy Sharp" sx={{ width: 36, height: 36 }} src="src/assets/png/Rapper_DSK.png" />
        <Typography
          component="span"
          sx={{
            color: '#fff',
            fontSize: 16,
            maxWidth: '140px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Nguyễn Huy Hoàng 12
        </Typography>
        <ArrowDropDownIcon sx={{ marginLeft: 'auto' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{ width: 220 }} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem sx={{ width: 220 }} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem sx={{ width: 220 }} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default UserHeader;

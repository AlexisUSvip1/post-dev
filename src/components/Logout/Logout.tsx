/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../Navbar/NavbarLeft/NavbarLeft.styles';

export const Logout = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    navigate('/');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      position={'absolute'}
      bottom={0}
      className={classes.containerLogout}
      onClick={handleLogout}
    >
      <ExitToAppIcon sx={{ width: '16px', height: '16px' }} />
      <Typography className={classes.link}>Sign Out</Typography>
    </Box>
  );
};

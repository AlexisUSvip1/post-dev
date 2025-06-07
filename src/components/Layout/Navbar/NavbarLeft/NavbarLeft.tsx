import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useStyles } from './NavbarLeft.styles';
import HomeIcon from '../../../../assets/homeIcon.svg';
import FireIcon from '../../../../assets/fireIcon.svg';
import ExplorerIcon from '../../../../assets/explorerIcon.svg';
import SaveIcon from '../../../../assets/saveIcon.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hook/useAppSelector';
import { Followers } from '../../../Followers/Followers';
import { Logout } from '../../../../pages/Logout/Logout';

const navLinks = [
  { path: '/feed', label: 'Home', icon: HomeIcon },
  { path: '/popular', label: 'Explorar Popular', icon: FireIcon },
  { path: '/explore', label: 'Explorar', icon: ExplorerIcon },
  { path: '/save', label: 'Guardados', icon: SaveIcon },
];

export const NavbarLeft: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navItemStyle = (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: active ? 'rgba(45, 74, 83, 0.67)' : 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(45, 74, 83, 0.5)',
    },
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    color: '#AFB3B7',
  });

  return (
    <Box className={classes.root}>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <Box
          className={classes.header}
          sx={{
            backgroundColor: isActive('/profile') ? 'rgba(45, 74, 83, 0.67)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(45, 74, 83, 0.5)',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <img
            src={user.avatar_url}
            alt={user.displayName || 'Avatar'}
            className={classes.avatar}
          />
          <Typography variant="body1" className={classes.displayName}>
            {user.displayName}
          </Typography>
        </Box>
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '30px',
        }}
      >
        {navLinks.map(({ path, label, icon }) => (
          <Link key={path} to={path} style={navItemStyle(isActive(path))}>
            <img src={icon} alt={`${label} icon`} width="16" height="16" />
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>{t(label)}</Typography>
          </Link>
        ))}

        <Followers />
        <Logout />
      </Box>
    </Box>
  );
};

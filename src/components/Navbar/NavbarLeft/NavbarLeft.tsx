import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAppSelector } from '../../../hook/useAppSelector';
import { Link, useLocation } from 'react-router-dom';
import { useStyles } from './NavbarLeft.styles';
import HomeIcon from '../../../assets/homeIcon.svg';
import FireIcon from '../../../assets/fireIcon.svg';
import ExplorerIcon from '../../../assets/explorerIcon.svg';
import SaveIcon from '../../../assets/saveIcon.svg';
import { useTranslation } from 'react-i18next';
import { Logout } from '../../Logout/Logout';

export const NavbarLeft: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Avatar
          src={user.avatar_url}
          alt={user.displayName}
          className={classes.avatar}
        />
        <Typography variant="body1" className={classes.displayName}>
          {user.displayName}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { path: "/feed", label: "Tu Feed", icon: HomeIcon },
          { path: "/popular", label: "Explorar Popular", icon: FireIcon },
          { path: "/explore", label: "Explorar", icon: ExplorerIcon },
          { path: "/save", label: "Guardados", icon: SaveIcon },
        ].map((link) => (
          <Box
            key={link.path}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              borderRadius: "4px",
              backgroundColor: isActive(link.path)
                ? "rgba(45, 74, 83, 0.67)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(45, 74, 83, 0.5)",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <img src={link.icon} alt={link.label} width="16" height="16" />
            <Link
              to={link.path}
              style={{
                textDecoration: "none",
                color: "#AFB3B7",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {t(link.label)}
            </Link>
          </Box>
        ))}
        <Logout />
      </Box>
    </Box>
  );
};

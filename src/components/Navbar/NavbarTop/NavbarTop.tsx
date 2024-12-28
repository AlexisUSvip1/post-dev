import React from "react";
import { AppBar, Box, Button, InputBase, Toolbar } from "@mui/material";
import { PositionLogo } from "../../../Utils/PositionLogo/PositionLogo";
import { Add } from "@mui/icons-material"; // Import Add icon
import { useStyles } from "./NavbarTop.styles";
import { useTranslation } from "react-i18next";
import { usePostModal } from "./NavbarTop.hooks";
import { PostModal } from "../../CreatePost/Post";

export const NavbarTop: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { handleOpenModal } = usePostModal();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* Left Section: Logo */}
        <Box className={classes.logoContainer}>
          <PositionLogo />
        </Box>

        {/* Center Section: Search Bar */}
        <Box>
          <InputBase
            placeholder={t("Buscar...")}
            className={classes.searchBox}
          />
        </Box>

        {/* Right Section: User Display Name and Button */}
        <Box className={classes.rightSection}>
          <Button className={classes.newPostButton} onClick={handleOpenModal}>
            <Add className={classes.newPostIcon} />
            New Post
          </Button>
        </Box>
        <PostModal />
      </Toolbar>
    </AppBar>
  );
};
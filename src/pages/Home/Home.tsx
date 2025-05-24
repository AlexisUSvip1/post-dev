import React from "react";
import { Box } from "@mui/material";

import { Homehook } from "./Home.hook";
import { NewPosts } from "../../components/CardPost/CardPost";
import { NavbarTop } from "../../components/Layout/Navbar/NavbarTop/NavbarTop";
import { NavbarLeft } from "../../components/Layout/Navbar/NavbarLeft/NavbarLeft";

const Home: React.FC = () => {
  const { loading, error } = Homehook();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box display="flex" height="100vh" width="100%">
      {/* 20% izquierda */}
      <Box width="20%" height="100vh">
        <NavbarLeft />
      </Box>

      {/* 60% centro */}
      <Box width="80%" height="100vh" display="flex" flexDirection="column">
        <NavbarTop />
        <Box flex="1" overflow="hidden">
          <NewPosts />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

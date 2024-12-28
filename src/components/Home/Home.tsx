import React from "react";
import { Box } from "@mui/material";
import { NavbarTop } from "../Navbar/NavbarTop/NavbarTop";
import { NavbarLeft } from "../Navbar/NavbarLeft/NavbarLeft";
import { Homehook } from "./Home.hook";

const Home: React.FC = () => {
  const { loading, error } = Homehook();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box display="flex" height="100vh" width="100%">
      <NavbarLeft />
      <Box display="flex" flexDirection="column" width="100%">
        <NavbarTop />
      </Box>
    </Box>
  );
};

export default Home;
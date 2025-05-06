import React from 'react';
import { Box } from '@mui/material';
import { NavbarTop } from '../Navbar/NavbarTop/NavbarTop';
import { NavbarLeft } from '../Navbar/NavbarLeft/NavbarLeft';
import { Homehook } from './Home.hook';
import { NewPosts } from '../CardPost/CardPost';
import { Followers } from '../Followers/Followers';

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

      {/* 20% derecha */}
      <Box width="20%" height="100vh">
        <Followers />
      </Box>
    </Box>
  );
};

export default Home;

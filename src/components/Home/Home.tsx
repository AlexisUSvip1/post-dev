import React from 'react';
import { Box } from '@mui/material';
import { NavbarTop } from '../Navbar/NavbarTop/NavbarTop';
import { NavbarLeft } from '../Navbar/NavbarLeft/NavbarLeft';
import { Homehook } from './Home.hook';
import { NewPosts } from '../CardPost/NewsPost';

const Home: React.FC = () => {
  const { loading, error } = Homehook();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box display="flex" height="100vh" width="100%">
      <NavbarLeft />
      <Box display="flex" flexDirection="column" width="100%">
        <NavbarTop />
        <NewPosts
          position="absolute"
          top="8%"
          left="14%"
          transform="translate(-50%, -50%)"
          width="85%"
          height="90vh"
          display="flex"
        />
      </Box>
    </Box>
  );
};

export default Home;

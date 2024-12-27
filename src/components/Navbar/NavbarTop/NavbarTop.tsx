import React from "react";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import { PositionLogo } from "../../../Utils/PositionLogo/PositionLogo";
import { useAppSelector } from "../../../hook/useAppSelector";

export const NavbarTop: React.FC = () => {
  const user = useAppSelector((slice)=> slice.user)

  console.log(user)
  return (
    <AppBar 
      position="sticky" 
      color="primary" 
      sx={{
        width: '100%',
        top: 0,
        display: 'flex',
        overflow:'hidden',
        alignItems: 'center',
        position:'absolute',
        background:'transparent',
        borderBottom: '2px solid #5A636A',
      }}
    >
      <Toolbar sx={{ width: '100%', display: 'flex', position:'relative', justifyContent:'center', alignItems:'center' }}>
       <Box><PositionLogo /></Box>
       <Typography>{user.displayName}</Typography>
        <Box position={'absolute'} left={'40%'}>
          <InputBase
            placeholder="Buscar..."
            sx={{
              padding: "6px 12px",
              backgroundColor: "#5A636A",
              borderRadius: "20px",
              width: "400px",
              color:'white',
              fontWeight:'bold',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
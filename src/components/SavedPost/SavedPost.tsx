/* eslint-disable react/react-in-jsx-scope */
import { Box } from "@mui/material";
import { NavbarLeft } from "../Navbar/NavbarLeft/NavbarLeft";
import { NavbarTop } from "../Navbar/NavbarTop/NavbarTop";
import { useSavePost } from "./useSavePost.hook";

export const SavedPost = () => {
  const { savePosts } = useSavePost();

  return (
    <Box display="flex" height="100vh" width="100%">
      {/*  Izquierdo */}
      <NavbarLeft />

      {/* Contenedor principal a la derecha */}
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {/* Navbar Superior */}
        <NavbarTop />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          width="90%"
          margin={"auto"}
        >
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            bgcolor="red"
            flexGrow={1}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
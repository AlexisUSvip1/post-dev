/* eslint-disable react/react-in-jsx-scope */
import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const ActionPost = () => {
  return (
    <>
      <Box sx={{ width: "90%", margin: "auto" }}>
        <IconButton type="submit">
          <FavoriteBorderIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", ml: 0.5 }}>{0}</Typography>{" "}
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", ml: 0.5 }}>10</Typography>
        </IconButton>
        <IconButton>
          <BookmarkBorderIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", ml: 0.5 }}>10</Typography>
        </IconButton>
      </Box>
    </>
  );
};

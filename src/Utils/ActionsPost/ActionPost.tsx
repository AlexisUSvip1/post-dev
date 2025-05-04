/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNewPostHook } from "../../components/CardPost/CardPost.hook";
import { Post } from "../../components/CardPost/CardPost.types";
import { useStyles } from "./ActionPost.styles";

interface ActionPostProps {
  post: Post;
}
export const ActionPost: React.FC<ActionPostProps> = ({ post }) => {
  const {
    handleLikePost,
    likedPosts,
    handleSavePost,
    savedPosts,
    handleOpenCommentModal,
  } = useNewPostHook();

  const classes = useStyles();

  return (
    <Box className={classes.iconContainer}>
      {/* Like Button */}
      <IconButton onClick={(event) => handleLikePost(event, post._id)}>
        {likedPosts[post._id] ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "white" }} />
        )}
        <Typography sx={{ color: "white", ml: 0.5 }}>
          {post.total_likes || 0}
        </Typography>
      </IconButton>

      {/* Comment Button */}
      <IconButton
        onClick={(event) => handleOpenCommentModal(event, post._id, true)}
      >
        <ChatBubbleOutlineIcon sx={{ color: "white" }} />
        <Typography sx={{ color: "white", ml: 0.5 }}>10</Typography>
      </IconButton>

      {/* Save Button */}
      <IconButton onClick={(event) => handleSavePost(event, post._id)}>
        {savedPosts[post._id] ? (
          <BookmarkIcon sx={{ color: "red" }} />
        ) : (
          <BookmarkBorderIcon sx={{ color: "white" }} />
        )}
      </IconButton>
    </Box>
  );
};
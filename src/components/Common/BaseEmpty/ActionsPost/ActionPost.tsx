/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useStyles } from "./ActionPost.styles";
import PropTypes from "prop-types";
import { Post } from "../../../CardPost/CardPost.types";

interface ActionPostProps {
  post: Post;
  liked: boolean;
  saved: boolean;
  onLike: (e: React.MouseEvent<HTMLButtonElement>, postId: string) => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>, postId: string) => void;
  onOpenComment: (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string,
    open: boolean
  ) => void;
}
export const ActionPost: React.FC<ActionPostProps> = ({
  post,
  liked,
  saved,
  onLike,
  onSave,
  onOpenComment,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.iconContainer}>
      <IconButton onClick={(event) => onLike(event, post._id)}>
        {liked ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "white" }} />
        )}
        <Typography sx={{ color: "white", ml: 0.5 }}>
          {post.total_likes || 0}
        </Typography>
      </IconButton>

      <IconButton onClick={(event) => onOpenComment(event, post._id, true)}>
        <ChatBubbleOutlineIcon sx={{ color: "white" }} />
        <Typography sx={{ color: "white", ml: 0.5 }}>10</Typography>
      </IconButton>

      <IconButton onClick={(event) => onSave(event, post._id)}>
        {saved ? (
          <BookmarkIcon sx={{ color: "red" }} />
        ) : (
          <BookmarkBorderIcon sx={{ color: "white" }} />
        )}
      </IconButton>
    </Box>
  );
};

ActionPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    user_avatar: PropTypes.string.isRequired,
    usernameUser: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
    total_likes: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

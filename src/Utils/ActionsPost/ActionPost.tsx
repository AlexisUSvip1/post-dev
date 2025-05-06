/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNewPostHook } from '../../components/CardPost/CardPost.hook';
import { Post } from '../../components/CardPost/CardPost.types';
import { useStyles } from './ActionPost.styles';
import PropTypes from 'prop-types';

interface ActionPostProps {
  post?: Post;
}

export const ActionPost: React.FC<ActionPostProps> = ({ post }) => {
  const { handleLikePost, likedPosts, handleSavePost, savedPosts, handleOpenCommentModal } =
    useNewPostHook();

  const classes = useStyles();

  if (!post) {
    return null;
  }

  return (
    <Box className={classes.iconContainer}>
      {/* Like Button */}
      <IconButton onClick={(event) => handleLikePost(event, post._id)}>
        {likedPosts[post._id] ? (
          <FavoriteIcon sx={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: 'white' }} />
        )}
        <Typography sx={{ color: 'white', ml: 0.5 }}>{post.total_likes || 0}</Typography>
      </IconButton>

      {/* Comment Button */}
      <IconButton onClick={(event) => handleOpenCommentModal(event, post._id, true)}>
        <ChatBubbleOutlineIcon sx={{ color: 'white' }} />
        <Typography sx={{ color: 'white', ml: 0.5 }}>10</Typography>
      </IconButton>

      {/* Save Button */}
      <IconButton onClick={(event) => handleSavePost(event, post._id)}>
        {savedPosts[post._id] ? (
          <BookmarkIcon sx={{ color: 'red' }} />
        ) : (
          <BookmarkBorderIcon sx={{ color: 'white' }} />
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

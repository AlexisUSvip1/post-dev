/* eslint-disable react/react-in-jsx-scope */
import { useStyles } from './NewsPost.styles';
import { useNewPostHook } from './NewPost.hook';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Post } from './NewPost.types';

export const NewPosts = () => {
  const { posts, loading, error } = useNewPostHook();
  const classes = useStyles();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className={classes.newsPost}>
      <Box className={classes.postsContainer}>
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <Box key={post._id} className={classes.postCard}>
              <Box display="flex" alignItems="center" gap={2} mb={2} width="100%">
                <img src={post.user_avatar} alt="Avatar" className={classes.avatar} />
                <Box>
                  <Typography fontWeight="bold">
                    {post.usernameUser || 'Usuario desconocido'}
                  </Typography>
                  <Typography color="rgba(255,255,255,0.80)">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>

              <Typography width="100%" display="flex" alignSelf="flex-start">
                {post.title}
              </Typography>

              {post.media.length > 0 && (
                <Box className={classes.containerImagesPost}>
                  {post.media.length === 1 && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${post.media[0].url}`}
                      alt="Post Media"
                      className={classes.fullImage}
                    />
                  )}

                  {post.media.length > 1 && post.media.length <= 3 && (
                    <Box className={classes.multiImageContainer}>
                      {post.media.map((image: { url: string; type: string }, index: number) => (
                        <img
                          key={index}
                          src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                          alt="Post Media"
                          className={classes.multiImage}
                        />
                      ))}
                    </Box>
                  )}

                  {post.media.length > 3 && (
                    <Box className={classes.multiImageContainer}>
                      {post.media
                        .slice(0, 3)
                        .map((image: { url: string; type: string }, index: number) => (
                          <img
                            key={index}
                            src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                            alt="Post Media"
                            className={classes.multiImage}
                          />
                        ))}
                      <Box className={classes.moreImagesOverlay}>
                        <Typography>+{post.media.length - 3}</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {/* 🔹 Los íconos siempre estarán alineados abajo */}
              <Box className={classes.iconContainer}>
                <IconButton>
                  <FavoriteBorderIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton>
                  <BookmarkBorderIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No hay publicaciones disponibles.</Typography>
        )}
      </Box>
    </Box>
  );
};

/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNewPostHook } from './NewPost.hook';
import { useStyles } from './NewsPost.styles';
import { BaseEmpty } from '../../Utils/BaseEmpty/BaseEmpty';
import { NewsPostSkeleton } from '../../Utils/Skeletor/SkeletorPost/SkeletorPost';

export const NewPosts = () => {
  const { posts, loading, error, handleLikePost, likedPosts } = useNewPostHook();
  const classes = useStyles();

  if (error) return <Typography color="error">{error}</Typography>;

  if (loading) {
    return (
      <Box className={classes.newsPost}>
        <Box className={classes.postsContainer}>
          {[...Array(7)].map((_, index) => (
            <NewsPostSkeleton key={index} />
          ))}
        </Box>
      </Box>
    );
  }
  if (!loading && posts.length === 0) {
    return (
      <Box className={classes.baseEmpty}>
        <BaseEmpty />
      </Box>
    );
  }
  return (
    <Box className={classes.newsPost}>
      <Box className={classes.postsContainer}>
        {posts.map((post) => (
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
            {/* 🔹 Sección de iconos */}
            <Box className={classes.iconContainer}>
              <IconButton onClick={() => handleLikePost(post._id)}>
                {likedPosts ? (
                  <FavoriteIcon sx={{ color: 'white' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: 'white' }} />
                )}
                <Typography sx={{ color: 'white', ml: 0.5 }}>5</Typography>
              </IconButton>
              <IconButton>
                <ChatBubbleOutlineIcon sx={{ color: 'white' }} />
                <Typography sx={{ color: 'white', ml: 0.5 }}>10</Typography>
              </IconButton>
              <IconButton>
                <BookmarkBorderIcon sx={{ color: 'white' }} />
                <Typography sx={{ color: 'white', ml: 0.5 }}>10</Typography>
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

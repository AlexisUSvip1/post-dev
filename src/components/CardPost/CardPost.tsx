/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNewPostHook } from './CardPost.hook';
import { ShowModalPost } from './ShowModalPost/ShowModalPost';
import { CommentPost } from '../CommentPost/CommentPost';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStyles } from './CardPost.styles';
import { NewsPostSkeleton } from '../Common/Skeletor/SkeletorPost/SkeletorPost';
import { BaseEmpty } from '../Common/BaseEmpty/BaseEmpty';
import { ActionPost } from '../Common/BaseEmpty/ActionsPost/ActionPost';
import { techOptions } from '../../utils/Tags/Tags';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const NewPosts = () => {
  const {
    posts,
    loading,
    error,
    setShowModal,
    showModal,
    openCommentsPost,
    setOpenCommentsPost,
    postId,
    likedPosts,
    savedPosts,
    handleSavePost,
    handleLikePost,
    handleOpenCommentModal,
    selectedTechs,
    handleTechSelect,
    handleNextClick,
    currentIndex,
    handlePrevClick,
  } = useNewPostHook();
  const [selectedPost, setSelectedPost] = useState(null);
  const classes = useStyles();

  if (error) return <Typography color="error">{error}</Typography>;

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const filteredPosts =
    selectedTechs.length > 0
      ? posts.filter((post) => post.tags?.some((tag) => selectedTechs.includes(tag)))
      : posts;

  if (loading) {
    return (
      <Box className={classes.loadingWrapper}>
        <Box className={classes.skeletonGrid}>
          {[...Array(6)].map((_, index) => (
            <Box key={index} className={classes.skeletonBox}>
              <NewsPostSkeleton />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  const showBaseEmpty = filteredPosts.length === 0;

  const renderFilters = () =>
    techOptions.slice(currentIndex, currentIndex + 6).map((option, index) => (
      <Button
        key={index}
        className={classes.techButton}
        onClick={() => handleTechSelect(option)}
        sx={{
          backgroundColor: selectedTechs.includes(option)
            ? 'rgba(255,255,255,0.3)'
            : 'rgba(255,255,255,0.1)',
          color: selectedTechs.includes(option) ? '#fff' : 'rgba(255,255,255,0.7)',
          border: selectedTechs.includes(option)
            ? '1px solid rgba(255,255,255,0.5)'
            : '1px solid rgba(255,255,255,0.1)',
          '&:hover': {
            backgroundColor: selectedTechs.includes(option)
              ? 'rgba(255,255,255,0.35)'
              : 'rgba(255,255,255,0.15)',
          },
        }}
      >
        {option.toLowerCase()}
      </Button>
    ));

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.techCarouselWrapper}>
        <IconButton onClick={handlePrevClick} className={classes.carouselNavLeft}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {renderFilters()}

        <IconButton onClick={handleNextClick} className={classes.carouselNavRight}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {showBaseEmpty ? (
        <Box className={classes.baseEmpty}>
          <BaseEmpty />
        </Box>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.masonryGrid}
          columnClassName={classes.masonryColumn}
        >
          {filteredPosts.map((post) => (
            <Box key={post._id} className={classes.postCard}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
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

              <Typography mb={1}>{post.title}</Typography>

              {post.media?.length > 0 && (
                <Box className={classes.mediaContainer}>
                  {post.media.map((image, index) => (
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                      alt="Post Media"
                      className={classes.postImage}
                      onClick={() => {
                        setSelectedPost(post);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </Box>
              )}

              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                {Array.isArray(post.tags) &&
                  post.tags.slice(0, 3).map((tag, index) => (
                    <Typography key={index} className={classes.tag}>
                      {tag}
                    </Typography>
                  ))}
                {Array.isArray(post.tags) && post.tags.length > 3 && (
                  <Tooltip title={post.tags.slice(3).join(', ')} arrow>
                    <Box className={classes.tag}>+{post.tags.length - 3}</Box>
                  </Tooltip>
                )}
              </Box>

              <ActionPost
                post={post}
                liked={likedPosts[post._id]}
                saved={savedPosts[post._id]}
                onLike={handleLikePost}
                onSave={handleSavePost}
                onOpenComment={handleOpenCommentModal}
              />

              <CommentPost
                open={openCommentsPost}
                onClose={() => setOpenCommentsPost(false)}
                post={postId}
              />
            </Box>
          ))}
        </Masonry>
      )}

      <ShowModalPost
        open={showModal}
        onClose={() => setShowModal(false)}
        title=""
        post={selectedPost || undefined}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

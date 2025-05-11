/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography } from '@mui/material';
import { NavbarLeft } from '../Navbar/NavbarLeft/NavbarLeft';
import { NavbarTop } from '../Navbar/NavbarTop/NavbarTop';
import { useSavePost } from './useSavepost.hook';
import { BaseEmpty } from '../../Utils/BaseEmpty/BaseEmpty';
import { NewsPostSkeleton } from '../../Utils/Skeletor/SkeletorPost/SkeletorPost';
import { useStyles } from './SavePost.styles';
import { ShowModalPost } from '../CardPost/ShowModalPost/ShowModalPost';
import Masonry from "react-masonry-css";

export const SavedPost = () => {
  const {
    savePosts,
    error,
    loading,
    selectedPost,
    setSelectedPost,
    showModal,
    setShowModal,
  } = useSavePost(); // ✅ ahora incluye showModal y setShowModal

  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const renderError = () => (
    <Typography color="error" sx={{ m: 2 }}>
      {error}
    </Typography>
  );

  const renderLoading = () => (
    <Box className={classes.newsPost}>
      <Box className={classes.postsContainer}>
        {[...Array(7)].map((_, index) => (
          <NewsPostSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );

  const renderEmpty = () => (
    <Box className={classes.baseEmpty}>
      <BaseEmpty />
    </Box>
  );

  const renderPosts = () => (
    <Box className={classes.postsContainer}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryColumn}
      >
        {savePosts.map((post) => (
          <Box
            key={post._id}
            className={classes.postCard}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedPost(post); // ✅ Selecciona el post
              setShowModal(true); // ✅ Abre el modal
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={2} width="100%">
              <img
                src={post.user_avatar}
                alt="Avatar"
                className={classes.avatar}
              />
              <Box>
                <Typography fontWeight="bold">
                  {post.usernameUser || "Usuario desconocido"}
                </Typography>
                <Typography color="rgba(255,255,255,0.80)">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>

            <Typography width="100%" display="flex" alignSelf="flex-start">
              {post.title}
            </Typography>

            {post.media.length > 0 && (
              <Box className={classes.containerImagesPost}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    post.media[0].url
                  }`}
                  alt="Post Media"
                  className={classes.fullImage}
                />
              </Box>
            )}

            <Box
              display="flex"
              gap={1}
              flexWrap="wrap"
              alignItems="center"
              mt={1}
            >
              {Array.isArray(post.tags) &&
                post.tags.length > 0 &&
                post.tags.slice(0, 3).map((tag, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(90,99,106,0.40)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {tag}
                  </Typography>
                ))}
            </Box>
          </Box>
        ))}
      </Masonry>
    </Box>
  );

  return (
    <Box display="flex" height="100vh" width="100%">
      <NavbarLeft />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <NavbarTop />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          width="90%"
          margin="auto"
          flexDirection="column"
        >
          {error && renderError()}
          {loading && renderLoading()}
          {!loading && savePosts.length === 0 && renderEmpty()}
          {!loading && savePosts.length > 0 && renderPosts()}
        </Box>
      </Box>

      {/* ✅ Modal funcional */}
      <ShowModalPost
        open={showModal}
        onClose={() => setShowModal(false)}
        title={selectedPost?.title || ""}
        post={selectedPost}
      />
    </Box>
  );
};
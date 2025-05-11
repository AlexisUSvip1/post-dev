/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button } from '@mui/material';
import { useNewPostHook } from "./CardPost.hook";
import { ShowModalPost } from "./ShowModalPost/ShowModalPost";
import { CommentPost } from "../CommentPost/CommentPost";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Masonry from "react-masonry-css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "./CardPost.styles";
import { NewsPostSkeleton } from "../Common/Skeletor/SkeletorPost/SkeletorPost";
import { BaseEmpty } from "../Common/BaseEmpty/BaseEmpty";
import { ActionPost } from "../Common/BaseEmpty/ActionsPost/ActionPost";

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
  if (loading) {
    return (
      <Box className={classes.loadingWrapper}>
        <Box className={classes.skeletonGrid}>
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "300px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                padding: "10px",
              }}
            >
              <NewsPostSkeleton />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseEmpty />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryColumn}
      >
        {posts.map((post) => (
          <Box
            key={post._id}
            sx={{
              background: "rgba(90,99,106,0.30)",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "16px",
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <img
                src={post.user_avatar}
                alt="Avatar"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
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

            <Typography mb={1}>{post.title}</Typography>

            {post.media.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {post.media.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                    alt="Post Media"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
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
                  <Typography
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(90,99,106,0.40)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      fontSize: "13px",
                    }}
                  >
                    {tag}
                  </Typography>
                ))}
              {post.tags.length > 3 && (
                <Tooltip title={post.tags.slice(3).join(", ")} arrow>
                  <Box
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(90,99,106,0.40)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      fontSize: "13px",
                    }}
                  >
                    +{post.tags.length - 3}
                  </Box>
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

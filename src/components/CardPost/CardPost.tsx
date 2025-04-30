/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark"; // <- agregado
import { useNewPostHook } from "./CardPost.hook";
import { useStyles } from "./CardPost.styles";
import { BaseEmpty } from "../../Utils/BaseEmpty/BaseEmpty";
import { NewsPostSkeleton } from "../../Utils/Skeletor/SkeletorPost/SkeletorPost";
import { ShowModalPost } from "./ShowModalPost/ShowModalPost";
import { useState } from "react";
import { CommentPost } from "../CommentPost/CommentPost";
import Tooltip from "@mui/material/Tooltip"; // 👈 importa Tooltip

export const NewPosts = () => {
  const {
    posts,
    loading,
    error,
    handleLikePost,
    likedPosts,
    handleSavePost, // <- agregado
    savedPosts, // <- agregado
    setShowModal,
    showModal,
    openCommentsPost,
    handleOpenCommentModal,
    setOpenCommentsPost,
    postId,
  } = useNewPostHook();
  const classes = useStyles();
  const [selectedPost, setSelectedPost] = useState(null);

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
                {post.media.length === 1 && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      post.media[0].url
                    }`}
                    alt="Post Media"
                    className={classes.fullImage}
                    onClick={() => {
                      setSelectedPost(post);
                      setShowModal(true);
                    }}
                  />
                )}

                {post.media.length > 1 && post.media.length <= 3 && (
                  <Box className={classes.multiImageContainer}>
                    {post.media.map((image, index) => (
                      <img
                        key={index}
                        src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                        alt="Post Media"
                        className={classes.multiImage}
                        onClick={() => {
                          setSelectedPost(post);
                          setShowModal(true);
                        }}
                      />
                    ))}
                  </Box>
                )}

                {post.media.length > 3 && (
                  <Box className={classes.multiImageContainer}>
                    {post.media.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                        alt="Post Media"
                        className={classes.multiImage}
                      />
                    ))}
                    <Button
                      className={classes.moreImagesOverlay}
                      onClick={() => {
                        setSelectedPost(post);
                        setShowModal(true);
                      }}
                    >
                      <Typography>+{post.media.length - 3}</Typography>
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <Box
              display="flex"
              gap={1}
              flexWrap="wrap"
              alignItems="center"
              mt={1}
            >
              {Array.isArray(post.tags) && post.tags.length > 0
                ? post.tags.slice(0, 3).map((tag, index) => (
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
                  ))
                : null}

              {post.tags.length > 3 && (
                <Tooltip title={post.tags.slice(3).join(", ")} arrow>
                  <Box
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
                    +{post.tags.length - 3}
                  </Box>
                </Tooltip>
              )}
            </Box>

            <Box className={classes.iconContainer}>
              {/* Like Button */}
              <IconButton
                onClick={(event) => handleLikePost(event, post._id)}
                type="submit"
              >
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
                onClick={(event) =>
                  handleOpenCommentModal(event, post._id, true)
                }
              >
                <ChatBubbleOutlineIcon sx={{ color: "white" }} />
                <Typography sx={{ color: "white", ml: 0.5 }}>10</Typography>
              </IconButton>

              {/* Save Button - Aquí lo acomodé */}
              <IconButton onClick={(event) => handleSavePost(event, post._id)}>
                {savedPosts[post._id] ? (
                  <BookmarkIcon sx={{ color: "white" }} />
                ) : (
                  <BookmarkBorderIcon sx={{ color: "white" }} />
                )}
                <Typography sx={{ color: "white", ml: 0.5 }}></Typography>
              </IconButton>
            </Box>

            {/* Comments Modal */}
            <CommentPost
              open={openCommentsPost}
              onClose={() => setOpenCommentsPost(false)}
              post={postId}
            />
          </Box>
        ))}
      </Box>

      {/* Show Post Modal */}
      <ShowModalPost
        open={showModal}
        onClose={() => setShowModal(false)}
        title=""
        post={selectedPost || undefined}
      />
    </Box>
  );
};
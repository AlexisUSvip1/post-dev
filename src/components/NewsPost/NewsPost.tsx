import { useStyles } from "./NewsPost.styles";
import { useNewPostHook } from "./NewPost.hook";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Corazón vacío (like)
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // Mensajes
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"; // Guardar
export const NewPosts = () => {
  const { posts, loading, error, setViewPost } = useNewPostHook();
  const classes = useStyles();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className={classes.newsPost}>
      <Box className={classes.postsContainer}>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Box key={post._id} className={classes.postCard}>
                <Box display="flex" alignItems="center" gap={2} mb={2} width="100%">
                  <img
                    src={post.user_avatar}
                    alt="Avatar"
                    className={classes.avatar} />
                  <Box>
                    <Typography fontWeight="bold">
                      {post.usernameUser || "Usuario desconocido"}
                    </Typography>
                    <Typography color="rgba(255,255,255,0.80)">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </Typography>
                  </Box>
                </Box>

                {/* Título del post con truncamiento si es necesario */}
                <Typography width="100%" display="flex" alignSelf="flex-start">
                  {post.title}
                </Typography>

                {post.media.length > 0 && (
                  <Box className={classes.containerImagesPost}>
                    {post.media.length === 1 && (
                      // 📌 Si solo hay 1 imagen, ocupa todo el contenedor
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${post.media[0].url}`}
                        alt="Post Media"
                        className={classes.fullImage} />
                    )}

                    {post.media.length > 1 && post.media.length <= 3 && (
                      // 📌 Si hay 2 o 3 imágenes, se distribuyen en columnas
                      <Box className={classes.multiImageContainer} onClick={() => setViewPost(true)}>
                        {post.media.map((image, index) => (
                          <img
                            key={index}
                            src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                            alt="Post Media"
                            className={classes.multiImage} />
                        ))}
                      </Box>
                    )}

                    {post.media.length > 3 && (
                      // 📌 Si hay 4 o más imágenes, se muestran 3 + el contador "+X"
                      <Box className={classes.multiImageContainer}>
                        {post.media.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                            alt="Post Media"
                            className={classes.multiImage} />
                        ))}
                        <Box className={classes.moreImagesOverlay}>
                          <Typography>+{post.media.length - 3}</Typography>
                        </Box>
                      </Box>
                    )}
                    <Box className={classes.iconContainer}>
                      <IconButton onClick={()=>{}}>
                        <FavoriteBorderIcon sx={{ color: "white" }}/>
                      </IconButton>

                      <IconButton onClick={()=>{}}>
                        <ChatBubbleOutlineIcon sx={{ color: "white" }}/>
                      </IconButton>

                      <IconButton onClick={()=>{}}>
                        <BookmarkBorderIcon sx={{ color: "white" }}/>
                      </IconButton>
                    </Box>
                  </Box>
                  
                )}
              </Box>
            );
          })
        ) : (
          <Typography>No hay publicaciones disponibles.</Typography>
        )}
      </Box>
    </Box>
  );
};
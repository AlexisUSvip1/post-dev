import React, { useState } from "react";
import { Box, Modal, Typography, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useStyles } from "./ShowModalPost.styles";
import { ActionPost } from "../../../Utils/ActionsPost/ActionPost";
import { Post } from "../CardPost.types";

export interface ReusableModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  post?: Post;
}

export const ShowModalPost: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  post,
}) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (post?.media && currentIndex < post.media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        {post ? (
          <Box>
            <Box
              sx={{
                width: "90%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                gap={1}
              >
                <img
                  src={post.user_avatar}
                  className={classes.containerImage}
                />
                <Box>
                  <Typography variant="h5">{post.usernameUser}</Typography>
                  <Typography color="gray">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton onClick={onClose}>
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
              <Typography>{post.body}</Typography>
            </Box>
            {post.media && post.media.length > 0 && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
              >
                <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                  <ArrowBackIosIcon
                    sx={{ color: currentIndex === 0 ? "gray" : "white" }}
                  />
                </IconButton>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                  <Box width={300}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        post.media[currentIndex].url
                      }`}
                      alt="Post Media"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                </Slide>
                <IconButton
                  onClick={handleNext}
                  disabled={currentIndex === post.media.length - 1}
                >
                  <ArrowForwardIosIcon
                    sx={{
                      color:
                        currentIndex === post.media.length - 1
                          ? "gray"
                          : "white",
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </Box>
        ) : (
          <Typography>No hay información del post.</Typography>
        )}
        <ActionPost />
      </Box>
    </Modal>
  );
};

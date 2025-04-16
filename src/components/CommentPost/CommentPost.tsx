/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "./CommentPostStyle.styles";
import { ReusableModalProps } from "../CardPost/ShowModalPost/ShowModalPost";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../../hook/useAppSelector";
import SendIcon from "@mui/icons-material/Send";
import { useCommentsPost } from "./CommentPost.hooks";

interface CommentPostProps extends ReusableModalProps {
  open: boolean;
  onClose: () => void;
  post?: any; // Adjust the type of 'post' as needed
}

export const CommentPost: React.FC<CommentPostProps> = ({
  open = false,
  onClose,
  post,
}) => {
  const user = useAppSelector((state) => state.user);
  const {
    setResponseComment,
    responseComment,
    postNewComment,
    getCommentsPost,
  } = useCommentsPost(post);
  const classes = useStyles();

  useEffect(() => {
    if (open && post) {
      getCommentsPost();
    }
  }, [open, post]);
  return (
    <>
      <Modal open={!!open} onClose={onClose} className={classes.modal}>
        <Box className={classes.modalBox}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: 3,
            }}
          >
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography>Ver Publicacion Completa</Typography>
            <Box sx={{ marginTop: "20px" }}></Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <img
                src={user.avatar_url}
                alt=""
                className={classes.imgCommentUser}
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                placeholder="Ingresa un texto..."
                fullWidth
                value={responseComment}
                onChange={(event) => setResponseComment(event.target.value)}
                sx={{
                  background: "white",
                  backgroundColor: "rgba(90,99,106,0.60)",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent", // Make the border transparent
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent", // Ensure hover state is also transparent
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent", // Ensure focused state is also transparent
                    },
                  },
                }}
              />
              <Button onClick={postNewComment}>
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

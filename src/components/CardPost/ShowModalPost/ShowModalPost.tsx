import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStyles } from './ShowModalPost.styles';
import { Post } from '../CardPost.types';
import { ActionPost } from '../../Common/BaseEmpty/ActionsPost/ActionPost';

export interface ReusableModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  post?: Post;
}

export const ShowModalPost: React.FC<ReusableModalProps> = ({
  open = false,
  onClose = () => {},
  post,
}) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!post) return null;

  const handleNext = () => {
    if (post.media && currentIndex < post.media.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        <Box className={classes.header}>
          <Box className={classes.userInfo}>
            <img src={post.user_avatar} className={classes.containerImage} alt="User avatar" />
            <Box>
              <Typography variant="h5">{post.usernameUser}</Typography>
              <Typography color="gray">{new Date(post.created_at).toLocaleDateString()}</Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Box className={classes.body}>
          <Typography>{post.body}</Typography>
        </Box>

        {post.media?.length > 0 && (
          <Box className={classes.mediaWrapper}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${post.media[currentIndex].url}`}
              alt="Post media"
              className={classes.mediaImage}
            />

            {post.media.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  className={classes.navLeft}
                  disabled={currentIndex === 0}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  className={classes.navRight}
                  disabled={currentIndex === post.media.length - 1}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
          </Box>
        )}

        <Box className={classes.actions}>
          <ActionPost post={post} />
        </Box>
      </Box>
    </Modal>
  );
};

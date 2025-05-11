import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStyles } from "./ShowModalPost.styles";
import { Post } from '../CardPost.types';
import { ActionPost } from "../../Common/BaseEmpty/ActionsPost/ActionPost";

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

  if (!post) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        <Box>
          <Box
            sx={{
              width: '90%',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Box display={'flex'} justifyContent="center" alignItems={'center'} gap={1}>
              <img src={post.user_avatar} className={classes.containerImage} alt="User avatar" />
              <Box>
                <Typography variant="h5">{post.usernameUser}</Typography>
                <Typography color="gray">
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={onClose}>
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ width: '90%', margin: 'auto', mt: 2 }}>
            <Typography>{post.body}</Typography>
          </Box>
          {post.media && post.media.length > 0 && (
            <Box sx={{ width: '90%', margin: 'auto', mt: 2, position: 'relative' }}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${post.media[currentIndex].url}`}
                alt="Post media"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              {post.media.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrev}
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                    }}
                    disabled={currentIndex === 0}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                    }}
                    disabled={currentIndex === post.media.length - 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
            </Box>
          )}
          <Box sx={{ width: '90%', margin: 'auto', mt: 2 }}>
            <ActionPost post={post} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

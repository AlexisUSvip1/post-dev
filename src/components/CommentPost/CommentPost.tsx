import React, { useEffect } from 'react';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useStyles } from './CommentPostStyle.styles';
import { ReusableModalProps } from '../CardPost/ShowModalPost/ShowModalPost';
import { useAppSelector } from '../../hook/useAppSelector';
import { useCommentsPost } from './CommentPost.hooks';

interface CommentPostProps extends ReusableModalProps {
  open: boolean;
  onClose: () => void;
  post?: any;
}

export const CommentPost: React.FC<CommentPostProps> = ({ open = false, onClose, post }) => {
  const user = useAppSelector((state) => state.user);
  const { setResponseComment, responseComment, postNewComment, getCommentsPost } =
    useCommentsPost(post);

  const classes = useStyles();

  useEffect(() => {
    if (open && post) {
      getCommentsPost();
    }
  }, [open, post]);

  return (
    <Modal open={!!open} onClose={onClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        <Box className={classes.header}>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        <Box className={classes.content}>
          <Typography>Ver publicación completa</Typography>

          <Box className={classes.inputRow}>
            <img
              src={user.avatar_url}
              alt="Avatar del usuario"
              className={classes.imgCommentUser}
            />
            <TextField
              placeholder="Ingresa un texto..."
              fullWidth
              value={responseComment}
              onChange={(e) => setResponseComment(e.target.value)}
              sx={{
                backgroundColor: 'rgba(90,99,106,0.60)',
                borderRadius: '50px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
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
  );
};

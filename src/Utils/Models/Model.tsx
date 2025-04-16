import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from '../../components/CreatePost/Post.styles';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const ReusableModal: React.FC<ReusableModalProps> = ({ open, onClose, title, children }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.modalBox}>
        {/* Header del Modal */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Contenido del Modal */}
        <Box className={classes.modalContent}>{children}</Box>
      </Box>
    </Modal>
  );
};

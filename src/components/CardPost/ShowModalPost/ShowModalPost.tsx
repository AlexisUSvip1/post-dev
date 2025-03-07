import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  post?: any; // 📌 Se agrega el post como prop opcional
}

export const ShowModalPost: React.FC<ReusableModalProps> = ({ open, onClose, title, post }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: '20px', backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
        {/* Header del Modal */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        {/* Contenido del Modal */}
        {post ? (
          <Box>
            <Typography variant="h5">{post.title}</Typography>
            <Typography color="gray">{new Date(post.created_at).toLocaleDateString()}</Typography>

            {post.media && post.media.length > 0 && (
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                {post.media.map((image: { url: string }, index: number) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_BACKEND_URL}${image.url}`}
                    alt="Post Media"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Typography>No hay información del post.</Typography>
        )}
      </Box>
    </Modal>
  );
};

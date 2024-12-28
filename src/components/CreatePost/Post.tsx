import { useState } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";

export const PostModal = () => {
  const { openPostModal, handleCloseModal, handleSetPostContent } =
    usePostModal();

  const [localContent, setLocalContent] = useState<string>("");

  const handleSubmit = () => {
    handleSetPostContent(localContent);
    handleCloseModal();
    setLocalContent("");
  };

  console.log(openPostModal);
  return (
    <Modal
      open={openPostModal}
      onClose={handleCloseModal}
      sx={{
        backdropFilter: "blur(10px)", // Add blur effect to the background
        backgroundColor: "rgba(87, 87, 87, 0)", // Add a semi-transparent overlay
        display: "flex",
        alignItems: "center",
        zIndex: "10000",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Create New Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          placeholder="What's on your mind?"
          variant="outlined"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

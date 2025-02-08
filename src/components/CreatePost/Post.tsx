import React from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import { usePostModal } from "../Navbar/NavbarTop/NavbarTop.hooks";
import { usePostHook } from "./Post.hooks";
import { useStyles } from "./Post.styles";

export const PostModal = () => {
  const { openPostModal, handleCloseModal } = usePostModal();
  const { localContent, setLocalContent, handleSubmit, techOptions } =
    usePostHook();
  const classes = useStyles();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name); // Procesa el archivo como desees
    }
  };

  return (
    <Modal
      open={openPostModal}
      onClose={handleCloseModal}
      className={classes.modal}
    >
      <Box className={classes.modalBox}>
        <Typography variant="h6" className={classes.title}>
          Create Your Own Post
        </Typography>
        <TextField
          fullWidth
          value={localContent}
          className={classes.textField}
          onChange={(e) => setLocalContent(e.target.value)}
          placeholder="Por favor inserta tu publicación"
          variant="outlined"
        />
        <Box className={classes.techCarousel}>
          {techOptions.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              className={classes.techButton}
            >
              {option.toLowerCase()}
            </Button>
          ))}
        </Box>
        <TextField
          fullWidth
          multiline
          rows={5}
          value={localContent}
          className={classes.textFieldArea}
          onChange={(e) => setLocalContent(e.target.value)}
          placeholder="Por favor inserta tu publicación"
          variant="outlined"
        />
        <Box className={classes.fileUpload}>
          <Button
            variant="outlined"
            component="label"
            className={classes.fileButton}
          >
            Upload File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
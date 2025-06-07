import React from 'react';
import { Box, TextField, InputAdornment, Button, Typography } from '@mui/material';
import { Link } from '@mui/icons-material';
import { useStyles } from './ArticuleForm.styles';
import { useArticule } from './useArticule.hook';

export const ArticuleForm = () => {
  const classes = useStyles();
  const { url, setUrl, previewObject, setBody, body, handlePostArticule } = useArticule();

  const isButtonDisabled =
    !url && !body && !previewObject.title && !previewObject.description && !previewObject.image;

  return (
    <Box className={classes.formWrapper}>
      <TextField
        placeholder="Insert Article URL"
        fullWidth
        className={classes.textFieldArea}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {previewObject.image && (
        <Box className={classes.previewBox}>
          <img src={previewObject.image} alt="Preview" className={classes.previewImage} />
          <Box className={classes.previewText}>
            <Typography variant="h6">{previewObject.title}</Typography>
            <Typography variant="body2">{previewObject.description}</Typography>
          </Box>
        </Box>
      )}

      <TextField
        fullWidth
        multiline
        rows={8}
        inputProps={{ maxLength: 574 }}
        className={classes.textFieldArea}
        placeholder="Escribe tu artículo aquí..."
        variant="outlined"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Button
        onClick={handlePostArticule}
        className={classes.submitButton}
        disabled={isButtonDisabled}
      >
        Create Article
      </Button>
    </Box>
  );
};

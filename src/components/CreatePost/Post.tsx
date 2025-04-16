/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Modal, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { usePostModal } from '../Navbar/NavbarTop/NavbarTop.hooks';
import { usePostHook } from './Post.hooks';
import { useStyles } from './Post.styles';
import { useTranslation } from 'react-i18next';

export const PostModal = () => {
  const { openPostModal, handleCloseModal } = usePostModal();
  const {
    localContent,
    setLocalContent,
    handleSubmit,
    techOptions,
    setTextContent,
    fileSelected,
    contFiles,
    textContent,
    imagePreviews,
    handleFileChange,
    addTags,
    setAddTags,
    loadingSubmit,
    handleDeleteFilePost,
  } = usePostHook();
  const classes = useStyles();
  const { t } = useTranslation();

  const toggleTag = (tag: string) => {
    setAddTags(addTags.includes(tag) ? addTags.filter((t) => t !== tag) : [...addTags, tag]);
  };

  return (
    <Modal open={openPostModal} onClose={handleCloseModal} className={classes.modal}>
      <Box className={classes.modalBox}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" className={classes.title}>
            {t('Crea tu propia publicación')}
          </Typography>
          <IconButton onClick={handleCloseModal} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Título */}
        <TextField
          fullWidth
          value={localContent}
          className={classes.textField}
          onChange={(e) => setLocalContent(e.target.value)}
          placeholder={t('Por favor inserta tu título')}
          variant="outlined"
        />

        {/* Selección de tecnologías */}
        <Box className={classes.techCarousel}>
          {techOptions.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              className={addTags.includes(option) ? classes.techButtonSelected : classes.techButton}
              onClick={() => toggleTag(option)}
            >
              {option.toLowerCase()}
            </Button>
          ))}
        </Box>

        {/* Contenido del post */}
        <Box className={classes.textContainer} position="relative">
          <TextField
            fullWidth
            multiline
            rows={14}
            value={textContent}
            inputProps={{ maxLength: 574 }}
            className={classes.textFieldArea}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder={t('Por favor inserta tu publicación')}
            variant="outlined"
          />

          {/* Subida de archivos */}
          <Box
            className={classes.fileUpload}
            position="absolute"
            bottom={0}
            right={0}
            p={1}
            sx={{
              borderTop: '2px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Previsualización de imágenes */}
            <Box display="flex" alignItems="center" gap="5px">
              {contFiles > 4 && (
                <Box className={classes.moreFilesCircle}>
                  <Typography>+{contFiles - 4}</Typography>
                </Box>
              )}
              {imagePreviews.map((preview, index) => (
                <Box key={index}>
                  <Box sx={{ position: 'absolute' }}>
                    <IconButton
                      onClick={() => handleDeleteFilePost(preview)}
                      sx={{
                        position: 'relative',
                        zIndex: '999',
                        color: 'white',
                        background: 'black',
                        width: '12px',
                        height: '12px',
                        left: '55px',
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '14px' }} />
                    </IconButton>
                  </Box>
                  <img key={index} src={preview} alt="Preview" className={classes.imagePreview} />
                </Box>
              ))}
            </Box>

            {/* Botones de subir archivo y publicar */}
            <Box>
              <Button
                className={classes.buttonPost}
                onClick={handleSubmit}
                disabled={!textContent.trim() && !fileSelected}
              >
                {loadingSubmit ? (
                  <Typography>
                    <span className={classes.loadingDots}>.</span>
                    <span className={classes.loadingDots}>.</span>
                    <span className={classes.loadingDots}>.</span>
                  </Typography>
                ) : (
                  t('Publicar Post')
                )}
              </Button>
              <IconButton component="label" className={classes.fileButton}>
                <AttachFileIcon />
                <input type="file" multiple hidden onChange={handleFileChange} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Idioma seleccionado

  const open = Boolean(anchorEl);

  // Manejar la apertura del menú
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Manejar el cierre del menú y el cambio de idioma
  const handleClose = (lng?: string) => {
    setAnchorEl(null);
    if (lng) {
      i18n.changeLanguage(lng); // Cambia el idioma en i18n
      setSelectedLanguage(lng); // Actualiza el idioma seleccionado
    }
  };

  return (
    <Box position="absolute" top={10} right={20} zIndex={10000}>
      <Tooltip title={selectedLanguage === 'en' ? 'English' : 'Español'} arrow>
        <Button
          onClick={handleClick}
          sx={{
            borderBottom: '2px solid #5A636A',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 0,
          }}
        >
          {selectedLanguage === 'en' ? '{EN}' : '{ES}'}
        </Button>
      </Tooltip>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {selectedLanguage !== 'en' && (
          <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
        )}
        {selectedLanguage !== 'es' && (
          <MenuItem onClick={() => handleClose('es')}>Español</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
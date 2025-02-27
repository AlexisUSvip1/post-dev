/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button } from '@mui/material';
import { useStyles } from './Login.style';
import googleIcon from '../../assets/googleIcon.svg';
import { useTranslation } from 'react-i18next';
export const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation(); // Hook to get translation function

  const handleGoogleLogin = () => {
    console.log('Iniciando sesión con Google...');
    const googleLoginUrl = 'http://localhost:3000/auth/google';

    window.open(googleLoginUrl, '_blank', 'width=500,height=600');

    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:3000') return; // Ensure the message is from your backend

      const token = event.data;
      console.log('Token recibido:', token);

      // Save the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the home page
      window.location.href = '/home';
    });
  };

  return (
    <>
      <Box className={classes.container}>
        <Typography variant="h3" component="h2">
          <span className={classes.title}>{'{Post'}</span>{' '}
          <span className={classes.devPart}>{'dev}'}</span>
        </Typography>
        <Typography variant="h4" component="p" className={classes.subtitle}>
          {t('¿Quieres ver lo último para desarrolladores?')}
        </Typography>
        <Button
          onClick={handleGoogleLogin}
          sx={{
            backgroundColor: 'white',
            color: '#5A636A',
            fontWeight: 'bold',
            borderRadius: '100px',
          }}
        >
          <img src={googleIcon} width={45} height={45} alt="Ícono de cuenta de Google" />
          {t('Inicia sesión con Google')}
        </Button>
        <div className={classes.blurEffect}></div>
      </Box>
    </>
  );
};

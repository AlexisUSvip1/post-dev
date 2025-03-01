import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { clearUser } from '../../features/user/userSlice';
import { clearPostContent } from '../../features/Post/postSlice';
import { useAppDispatch } from '../../hook/useAppDispatch';

const AuthWatcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        if (location.pathname !== '/') {
          navigate('/'); // Si no hay token y no está en login, redirige al login
        }
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const { iat, exp } = decoded;
        const timeRemaining = exp - iat;

        console.log(`Tiempo restante del token en segundos: ${timeRemaining}`);
        console.log(`Tiempo restante en minutos: ${timeRemaining / 60}`);
        console.log(`Tiempo restante en horas: ${timeRemaining / 3600}`);

        if (Date.now() / 1000 > exp) {
          // Convertimos Date.now() a segundos
          localStorage.removeItem('token');
          localStorage.removeItem('expiresAt');
          dispatch(clearUser()); // Borra el estado del usuario
          dispatch(clearPostContent()); // Borra el estado de los posts
          navigate('/');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        dispatch(clearUser());
        dispatch(clearPostContent());
        navigate('/');
      }
    };

    const handleInvalidRoutes = () => {
      const validRoutes = ['/', '/home']; // Agrega aquí todas las rutas válidas
      if (!validRoutes.includes(location.pathname)) {
        navigate('/home'); // Si la ruta no es válida, redirige a home
      }
    };

    const redirectIfLoggedIn = () => {
      const token = localStorage.getItem('token');
      if (token && location.pathname === '/') {
        navigate('/home'); // Si está logueado e intenta ir al login, redirige a home
      }
    };

    checkTokenExpiration();
    handleInvalidRoutes();
    redirectIfLoggedIn();

    const interval = setInterval(checkTokenExpiration, 86400000);

    return () => clearInterval(interval);
  }, [navigate, location, dispatch]);

  return null; // Este componente no renderiza nada, solo ejecuta el efecto
};

export default AuthWatcher;

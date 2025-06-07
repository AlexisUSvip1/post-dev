export const checkTokenExpiration = (): void => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');

  if (!token || !expiresAt || Date.now() > parseInt(expiresAt)) {
    console.warn('Token expirado o no válido. Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    return;
  }
};

export const useLoginHook = () => {
  const handleGoogleLogin = (): void => {
    const googleLoginUrl = 'http://localhost:3000/auth/google';

    window.open(googleLoginUrl, '_blank', 'width=500,height=600');

    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:3000') return;

      const token = event.data;
      console.log('Token recibido:', token);

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = decodedToken.exp * 1000;

      localStorage.setItem('token', token);
      localStorage.setItem('expiresAt', expiresAt.toString());

      window.location.href = '/home';
    });
  };

  return { handleGoogleLogin };
};

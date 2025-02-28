export const useLoginHook = () => {
  const handleGoogleLogin = (): void => {
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
  return { handleGoogleLogin };
};

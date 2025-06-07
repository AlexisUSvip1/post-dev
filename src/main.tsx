/* eslint-disable react/react-in-jsx-scope */
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const updateFaviconColor = () => {
  const favicon = document.getElementById('favicon') as HTMLLinkElement;
  if (!favicon) {
    console.error('Favicon element not found!');
    return;
  }

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply an invert filter for dark mode (changes black to white)
  favicon.style.filter = isDarkMode ? 'invert(100%)' : 'invert(0%)';
};

// React component to handle favicon updates
const FaviconUpdater = () => {
  useEffect(() => {
    // Update favicon color on mount
    updateFaviconColor();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateFaviconColor);

    return () => {
      mediaQuery.removeEventListener('change', updateFaviconColor);
    };
  }, []);

  return null;
};

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <FaviconUpdater />
      <App />
    </StrictMode>
  </Provider>
);

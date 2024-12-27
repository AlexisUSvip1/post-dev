import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./i18n"
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App/>
    </StrictMode>
  </Provider>
)

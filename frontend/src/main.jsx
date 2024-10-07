import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Providers } from './providers.jsx'
import '@rainbow-me/rainbowkit/styles.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
    <App />
    </Providers>
  </StrictMode>,
)

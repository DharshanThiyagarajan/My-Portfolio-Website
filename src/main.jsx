import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.body.classList.add('preload');

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 500);
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

// Register ScrollTrigger and configure it to ignore mobile height changes
// This fixes the jitter when the mobile address bar hide/shows
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

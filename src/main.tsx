import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/App.tsx'
import i18n from '../i18n.ts';
import {initReactI18next} from "react-i18next";
import { registerSW } from "virtual:pwa-register";

const registerServiceWorker = () => {
    registerSW({
        onNeedRefresh() {
            console.log("Nueva versión disponible. Recarga la app.");
        },
        onOfflineReady() {
            console.log("La app ahora funciona sin conexión.");
        },
    });
};

registerServiceWorker();

i18n.use(initReactI18next);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

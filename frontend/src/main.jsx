import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NetworkProvider } from "./Context/NetworkProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.error("Erro ao registrar o Service Worker:", error);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NetworkProvider>
      <App />
    </NetworkProvider>
  </StrictMode>
);

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import QRCodeScanner from "./pages/QRCodeScanner";
import CardDetails from "./pages/CardDetails";
import Entrar from "./pages/Entrar";
import Info from "./pages/TrilhaEcologica";
import CardList from "./pages/CardList";
import ChangePassword from "./pages/ChangePassword.jsx";
import Mapa from "./pages/Mapa.jsx";
import { syncUsersFromBackend, syncSpeciesFromBackend } from "./dbStatic/sync";
import { fetchSpeciesFromCache } from "./dbStatic/offline-db";
import { useEffect, useState } from "react";
import { NetworkProvider } from "./Context/NetworkProvider.jsx"; 
import OfflineIndicator from "./components/OfflineIndicator.jsx";
const App = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    async function loadData() {
      const cachedSpecies = await fetchSpeciesFromCache();
      if (cachedSpecies.length > 0) {
        console.log("Dados carregados do IndexedDB:", cachedSpecies);
        setSpecies(cachedSpecies);
      }

      if (navigator.onLine) {
        setIsSyncing(true);
        try {
          await syncUsersFromBackend();
          await syncSpeciesFromBackend();
          const updatedSpecies = await fetchSpeciesFromCache();
          setSpecies(updatedSpecies);
        } catch (error) {
          console.error("Erro ao sincronizar dados:", error);
        }
        setIsSyncing(false);
      }
    }

    loadData();

    window.addEventListener("online", loadData);

    return () => {
      window.removeEventListener("online", loadData);
    };
  }, []);

  return (
    <NetworkProvider> 
      <Router>
        <OfflineIndicator /> 
        {isSyncing && <div className="sync-message">Sincronizando dados...</div>}
        <Routes>
          <Route path="/" element={<TelaInicial species={species} />} />
          <Route path="/info" element={<Info />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/nova-senha" element={<ChangePassword />} />
          <Route path="/QRCodeScanner" element={<QRCodeScanner />} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/card-list" element={<CardList species={species} />} />
        </Routes>
      </Router>
    </NetworkProvider>
  );
};

export default App;

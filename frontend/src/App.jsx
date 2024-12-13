import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Camera from "./pages/Camera";
import CardDetails from "./pages/CardDetails";
import { syncUsersFromBackend, syncSpeciesFromBackend } from "./dbStatic/sync";
import { useEffect, useState } from "react";

const App = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    async function synchronizeData() {
      if (navigator.onLine) {
        setIsSyncing(true);
        try {
         await syncUsersFromBackend();
          await syncSpeciesFromBackend();
        } catch (error) {
          console.error("Erro ao sincronizar dados:", error);
        }
        setIsSyncing(false);
      }
    }

    synchronizeData();

    window.addEventListener("online", synchronizeData);

    return () => {
      window.removeEventListener("online", synchronizeData);
    };
  }, []);

  return (
    <Router>
      {isSyncing && <div className="sync-message">Sincronizando dados...</div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/card-details" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

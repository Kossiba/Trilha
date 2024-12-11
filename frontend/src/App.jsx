import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Camera from "./pages/Camera";
import CardDetails from "./pages/CardDetails";
import { syncUsersFromBackend } from "./dbStatic/sync";
import { useEffect, useState } from "react";

const App = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    async function synchronizeData() {
      if (navigator.onLine) {
        setIsSyncing(true);
        await syncUsersFromBackend();
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
        <Route path="/Menu" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/card-details" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

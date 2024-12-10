import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Camera from "./pages/Camera";
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
        <Route path="/login" element={<Login />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
};

export default App;

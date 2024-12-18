import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import QRCodeScanner from "./pages/QRCodeScanner";
import CardDetails from "./pages/CardDetails";
import SignUp from "./pages/SignUp";
import TelaInicial from "./pages/TelaInicial";
import Entrar from "./pages/Entrar";
import Info from "./pages/TrilhaEcologica";
import CardList from "./pages/CardList";
import ChangePassword from "./pages/ChangePassword.jsx";
//import { syncUsersFromBackend, syncSpeciesFromBackend } from "./dbStatic/sync";
import { useEffect, useState } from "react";

const App = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    async function synchronizeData() {
      if (navigator.onLine) {
        setIsSyncing(true);
        try {
          //await syncUsersFromBackend();
          //await syncSpeciesFromBackend();
        } catch (error) {
          console.error("Erro ao sincronizar dados:", error);
        }
        setIsSyncing(false);
      }
    }

    //synchronizeData();

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
        <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/info" element={<Info />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/nova-senha" element={<ChangePassword />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/camera" element={<QRCodeScanner />} />
        <Route path="/card-details" element={<CardDetails />} />
        <Route path="/card-list" element={<CardList />} />
      </Routes>
    </Router>
  );
};

export default App;

import "../styles/TelaInicial.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const TelaInicial = () => {
  const navigate = useNavigate();

  const handleEntrarClick = () => {
    navigate("/Entrar");
  };

  const handleSaibaMaisClick = () => {
    navigate("/info");
  };

  const handleMapaClick = () => {
    navigate("/mapa");
  };

  return (
    <div className="container-telaInicial">
      <p className="tittle-telaInicial">Descubra a trilha da UTFPR</p>
      <div className="div-telainicial">
        <div className="divs-telaInicial">
          <img
            src="/assets/imgDiv1TelaInicial.png"
            className="img-div-telaInicial"
            alt="Biodiversidade"
          />
          <a className="text-div1-telaInicial">
            Explore e aprenda sobre a
            <br />
            biodiversidade da trilha!
          </a>
          <button className="button-div1-telaInicial" onClick={handleMapaClick}>
            Iniciar
          </button>
        </div>
        <div className="divs-telaInicial">
          <img
            src="/assets/imgDiv2TelaInicial.png"
            className="img-div-telaInicial"
            alt="Trilha Ecológica"
          />
          <a className="text-div2-telaInicial">
            O que é a trilha
            <br />
            ecológica?
          </a>
          <button
            className="button-div2-telaInicial"
            onClick={handleSaibaMaisClick}
          >
            Saiba mais
          </button>
        </div>
        <div className="divs-telaInicial">
          <img
            src="/assets/imgDiv3TelaInicial.png"
            className="img-div-telaInicial"
            alt="Administrador"
          />
          <a className="text-div3-telaInicial">
            Área do
            <br />
            Administrador
          </a>
          <button
            className="button-div3-telaInicial"
            onClick={handleEntrarClick}
          >
            Acesse aqui
          </button>
          <div className="div-navbar">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;

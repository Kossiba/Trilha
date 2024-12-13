import "../styles/Home.css";
import imgHome from "../assets/imgHome.png";
import imgLogo from "../assets/imgLogoUTFPR.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/Menu");
  };

  return (
    <div className="home-container">
      <img src={imgHome} className="img-home"></img>
      <a className="text-home">Bem-vindo a trilha ecológica</a>
      <a className="text-home01">da UTFPR</a>
      <button className="button-home" onClick={handleMenuClick}>
        CONTINUAR
      </button>
      <img src={imgLogo} className="img-logo"></img>
    </div>
  );
};

export default Home;

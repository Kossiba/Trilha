import "../styles/SignUp.css";
import imgLogin from "../assets/imgLogin.png";
import logoUTFPR from "../assets/imgLogoUTFPRbranco.png";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleSubmit = () => {
    navigate("/Login");
  };

  return (
    <div className="signUp-container">
      <img src={imgLogin} className="img-signUp"></img>
      <div className="div-signUp">
        <a className="text-Tittle">Nome Completo</a>
        <input className="input-text-signUp"></input>
        <a className="text-Tittle">Email</a>
        <input className="input-text-signUp"></input>
        <a className="text-Tittle">Criar senha</a>
        <input className="input-text-signUp"></input>
        <a className="text-Tittle">Confirmar senha</a>
        <input className="input-text-signUp"></input>
        <button className="button-cadastrar-singUp" onClick={handleSubmit}>
          CADASTRAR
        </button>
        <a className="text-signUp" onClick={handleLoginClick}>Possuo cadastro</a>
        <img src={logoUTFPR} className="logo-signUp"></img>
      </div>
    </div>
  );
};

export default SingUp;

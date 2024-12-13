import "../styles/Login.css";
import { useState } from "react";
import imgLogin from "../assets/imgLogin.png";
import { loginOffline } from "../dbStatic/offline-db";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Menu");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      login: login,
      password: password,
    };
    console.log(login, password);
    try {
      const response = await fetch(
        "https://trilha-2vfh.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login realizado com sucesso:", data);
        handleLoginClick();
      } else {
        console.error("Erro ao fazer login:", response.status);
        alert("Falha no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente.");
    }

    try {
      const result = await loginOffline(login, password);

      if (result.success) {
        console.log("Login realizado com sucesso (offline):", result.user);
        alert("Login realizado com sucesso (offline)!");
        handleLoginClick();
      } else {
        console.error(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro no login offline:", error);
      alert("Erro ao tentar login offline.");
    }
  };

  return (
    <div className="login-container">
      <img src={imgLogin} className="img-login-header"></img>
      <div className="div-login">
        <div className="div-input-login">
          <input
            className="input-text-login"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className="input-text-login"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button-entrar-login" onClick={handleSubmit}>
          ENTRAR
        </button>
        <a className="a-text-login" href="#">
          Esqueceu a senha
        </a>
      </div>
      <img></img>
    </div>
  );
};

export default Login;

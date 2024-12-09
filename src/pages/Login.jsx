import { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      login: login,
      password: password,
    };
    console.log(login, password);
    try {
      const response = await fetch("https://trilha-2vfh.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login realizado com sucesso:", data);
      } else {
        console.error("Erro ao fazer login:", response.status);
        alert("Falha no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-view">
        <p className="text-acessAccount">Acesse sua conta</p>
        <input
          className="input-text"
          placeholder="Nome, E-mail"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="input-text"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="button-enter" onClick={handleSubmit}>
          ENTRAR
        </button>
      </div>
    </div>
  );
};

export default Login;

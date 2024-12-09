import "../styles/Home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }
  const handleCameraClick = () =>{
    navigate('/camera');
  }
  return (
    <div className="home-container">
      <button className="button-left" onClick={handleLoginClick}>Entrar</button>
      <button className="button-right" onClick={handleCameraClick}>QR Code</button>
    </div>
  );
};

export default Home;

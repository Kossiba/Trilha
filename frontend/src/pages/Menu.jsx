import "../styles/Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleCameraClick = () => {
    navigate("/Camera");
  };
  return (
    <div className="menu-container">
      <div className="div-menu" onClick={handleCameraClick}>
        <FontAwesomeIcon icon={faQrcode} className="qr-icon" />
        <a>
          LER QRCODE
          <br></br>
          Aprenda sobre
          <br></br>
          fauna e flora
        </a>
      </div>
    </div>
  );
};

export default Menu;
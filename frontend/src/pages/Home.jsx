import "../styles/Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faFile, faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import imgLogin from "../assets/imgLogin.png";

const Card = ({ icon, rotation, title, description, onClick }) => {
  return (
    <div className="card-div" onClick={onClick}>
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} rotation={rotation} size="2x" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.object.isRequired,
  rotation: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Menu = () => {
  const navigate = useNavigate();
  const handleCameraClick = () => {
    navigate("/Camera");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div className="menu-container">
      <div className="menucards-div-menu">
        <div className="cards-div">
          <Card
            icon={faMapLocationDot}
            title="MAPA"
            description="Explore a trilha"
            onClick={handleCameraClick}
          />
          <Card
            icon={faQrcode}
            title="LER QRCODE"
            description="Aprenda sobre fauna e flora"
            onClick={handleCameraClick}
          />
        </div>
        <div className="cards-div">
          <Card
            icon={faFile}
            rotation={180}
            title="CARDS"
            description="Visualize seus cards"
            onClick={handleCameraClick}
          />
          <Card
            icon={faUser}
            title="ENTRAR"
            description="Realize login"
            onClick={handleLoginClick}
          />
        </div>
      </div>
      <img src={imgLogin} className="img-menu" alt="Login" />
    </div>
  );
};

export default Menu;

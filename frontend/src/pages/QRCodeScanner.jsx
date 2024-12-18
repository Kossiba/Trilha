import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
//import { getSpeciesById } from "../dbStatic/offline-db";
import "../styles/CardDetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const CardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { qrCodeData, speciesId } = location.state || {};
  const [speciesDetails, setSpeciesDetails] = useState(null);

  const handleTelaInicialClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const id = qrCodeData || speciesId;
    if (!id) {
      console.error("ID não fornecido. Redirecionando para a tela inicial.");
      navigate("/tela-inicial");
      return;
    }

    const fetchSpeciesDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/species/${id}`);

        if (response.ok) {
          const data = await response.json();
          setSpeciesDetails(data);
        } else {
          console.error("Failed to fetch species details");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSpeciesDetails();
  }, [qrCodeData, speciesId, navigate]);

  if (!speciesDetails) {
    return <p>Carregando detalhes...</p>;
  }

  return (
    <div className="card-details-container">
      <div className="header-carddetails">
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            color: "#0C9762",
            width: "2.02vh",
            height: "2.02vh",
            marginLeft: "3.91vh",
          }}
          onClick={handleTelaInicialClick}
        />
        <p className="tittle-carddetails">Detalhes da espécie</p>
        <FontAwesomeIcon
          icon={faShareNodes}
          style={{
            color: "#0C9762",
            width: "3vh",
            height: "3vh",
            marginRight: "4vh",
          }}
        />
      </div>
      <img src={speciesDetails.imgURL || "#"} className="img-carddetails" />
      <div className="div-text-carddetails">
        <p className="subttile-carddetails">
          {speciesDetails.nomepopular} ({speciesDetails.nomecientifico})
        </p>
        <p className="text-carddetails">
          {speciesDetails.descricao}
          <p className="subttile-carddetails">Características</p>
          <p className="text-carddetails">{speciesDetails.caracteristicas}</p>
        </p>
      </div>
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default CardDetails;

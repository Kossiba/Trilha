import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import imgTest from "../assets/imgHome.png";
import { getSpeciesById } from "../dbStatic/offline-db";
import "../styles/CardDetails.css";

const CardDetails = () => {
  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const [speciesDetails, setSpeciesDetails] = useState(null);
  console.log(qrCodeData);
  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      try {
        const response = await fetch(
          "https://trilha-2vfh.onrender.com/species/${qrCodeData}"
        );

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
  }, [qrCodeData]);

  // Conteúdo estático
  return (
    <div className="card-details-container">
      <div className="view-carddetails">
        <div className="view-top-carddetaiils"></div>
        <img
          src={imgTest}
          alt="Detalhe do Card"
          className="card-details-img"
        />
        <a>Nome: nomeTeste</a>
        <a>Nome popular: nomePopularTeste</a>
        <a>Bioma: biomaTeste</a>
        <a>Habitat: habitatTeste</a>
        <a>Altura: Não informada</a>
        <a>Diâmetro: Não informado</a>
        <a>Longevidade: Não informada</a>
        <div className="view-bottom-carddetaiils"></div>
      </div>
    </div>
  );
};

export default CardDetails;

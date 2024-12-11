import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpeciesById } from "../dbStatic/offline-db";
import "../styles/CardDetails.css";

const CardDetails = () => {
  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const [speciesDetails, setSpeciesDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (qrCodeData) {
        const data = await getSpeciesById(qrCodeData);
        setSpeciesDetails(data);
      }
    };

    fetchData();
  }, [qrCodeData]);

  return (
    <div className="card-details-container">
      <div className="view-card-details">
        {speciesDetails ? (
          <>
            <img src={speciesDetails.imageUrl || "#"} alt="Detalhe do Card" />
            <a>Nome: {speciesDetails.name}</a>
            <a>Nome popular: {speciesDetails.nomePopular}</a>
            <a>Bioma: {speciesDetails.bioma}</a>
            <a>Bioma: {speciesDetails.habitat}</a>
            <a>Altura: {speciesDetails.altura}</a>
            <a>Diâmetro: {speciesDetails.diametro}</a>
            <a>Longevidade: {speciesDetails.longevidade}</a>
          </>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default CardDetails;

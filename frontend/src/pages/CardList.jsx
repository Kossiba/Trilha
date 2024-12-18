import "../styles/CardList.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSpecies = async () => {
    try {
      const response = await fetch("http://localhost:3000/species");
      if (!response.ok) {
        throw new Error("Erro ao buscar as espécies");
      }
      const data = await response.json();
      setSpecies(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  
  const handleCardClick = (id) => {
    navigate("/card-details", { state: { speciesId: id } });
  };


  return (
    <div className="container-cardlist">
      <p className="tittle-cardlist">Espécies encontradas</p>
      <div className="grid-container">
        {species.map((specie) => (
          <div
            className="grid-item"
            key={specie.id}
            onClick={() => handleCardClick(specie.id)}
          >
            <img src={specie.imgURL} alt={specie.nomepopular} />
            <div className="card-overlay">
              <p>{specie.nomepopular}</p>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{
                  color: "#ffffff",
                  width: "2.02vh",
                  height: "2.02vh",
                  marginLeft: "3.91vh",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="div-navbar">
        <NavBar />
      </div>
    </div>
  );
};

export default CardList;

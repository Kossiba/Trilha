import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Mapa.css";

const Mapa = () => {
  useEffect(() => {
    const map = L.map("map").setView([37.7749, -122.4194], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([37.7749, -122.4194])
      .addTo(map)
      .bindPopup("Marcador Inicial<br> Latitude: 37.7749, Longitude: -122.4194")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="container-Mapa">
      <h1 className="tittle-Mapa">Mapa da trilha</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default Mapa;

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "./index.css";
import "leaflet/dist/leaflet.css";


// Definir el tipo de las coordenadas como LatLngExpression
import { LatLngExpression } from "leaflet";

export default function Mapa() {
  // Inicializar el estado con el tipo LatLngExpression (array de coordenadas)
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    // Simula la carga de coordenadas (por ejemplo, Madrid)
    setTimeout(() => {
      setPosition([40.4168, -3.7038]); // Coordenadas de Madrid
      console.log("Nueva posición:", [40.4168, -3.7038]); // 🔍 Verifica si se actualiza
    
  
    }, 1000);
  }, []);

  // Asegurarse de que position no sea null antes de renderizar el mapa
  if (!position) return <p>Cargando mapa...</p>;

  return (
    <div className="map-container">
    <MapContainer
      key={position.toString()}
      center={position} // Tipo LatLngExpression
      zoom={15}
      
      scrollWheelZoom={false}
      className="mapa"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>📍 Restaurante en Madrid</Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}

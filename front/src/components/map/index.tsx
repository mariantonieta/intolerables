import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "./index.css";
import "leaflet/dist/leaflet.css";

//mostrar mapa
import { LatLngExpression } from "leaflet";

export default function Mapa() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  // Coordenadas de Madrid
  useEffect(() => {
    setTimeout(() => {
      setPosition([40.4168, -3.7038]);
      console.log("Nueva posición:", [40.4168, -3.7038]);
    }, 1000);
  }, []);
  if (!position) return <p>Cargando mapa...</p>;

  return (
    <div className="mapa-container">
      <MapContainer
        key={position.toString()}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="mapa"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Restaurante en Madrid</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

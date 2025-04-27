import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

interface MapaProps {
  position: LatLngExpression;
}

export default function Mapa({ position }: MapaProps) {
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
          <Popup>Ubicación actual o seleccionada</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

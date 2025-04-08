import IntoleranciaCard from "../../components/cardintole/IntolerancaCard";
import Navigation from "../../containers/navigation";
import gluten from "../../../public/icons/gluten.svg";
import "./index.css";
import { useState } from "react";
import Modal from "../../components/modal";
interface Intolerancia{
  nombre: string;
  descripcion:string;
  detalles:string;
  imagen: string;
}
export default function Intolerancias() {
  const [modalOpen, setModalOpen] = useState(false)
  const [intoleSeleccionada, setIntoleSeleccionada] = useState<Intolerancia | null>(null);
const intoleranciasDatos: Intolerancia[] = [
  {
    nombre: "Gluten",
    descripcion: "No puedes consumir alimentos con gluten.",
    detalles: "El gluten es una proteína presente en el trigo, cebada y centeno. Su consumo puede causar problemas digestivos y de salud en personas con intolerancia o enfermedad celíaca.",
    imagen: gluten,
  },
  
]
  const handleSaberMas = (intolerancia: Intolerancia) => {
  setIntoleSeleccionada(intolerancia);
  setModalOpen(true); 
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSoy = () => {
    alert("Eres intolerante a esta sustancia.");
  };

  return (
    <>
      <Navigation />

      <div className="container">
        <h1>Intolerancias</h1>
        <div className="card-container">

          {intoleranciasDatos.map((intolerancia, index) =>(

          <IntoleranciaCard
          key={index}
          nombre={intolerancia.nombre}
          descripcion={intolerancia.descripcion}
          imagen={intolerancia.imagen}
          buttonSaberMas={() => handleSaberMas(intolerancia)}
          buttonSoy={handleSoy}
          />
          
        ))}
        </div>
      </div>
      <Modal open={modalOpen}
      onClose={handleClose}
      title={intoleSeleccionada?.nombre || ""}
      content={intoleSeleccionada?.detalles || ""}
      />
      
    </>
  );
}

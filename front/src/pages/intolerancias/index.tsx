import IntoleranciaCard from "../../components/cardintole/IntolerancaCard";
import Navigation from "../../containers/navigation";
import "./index.css";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import axios from "axios";
interface Intolerancia{
  nombre: string;
  descripcion:string;
  detalles:string;
  mensaje: string
  imagen: string;
}
export default function Intolerancias() {
  const [intolerancias, setIntolerancias] = useState<Intolerancia[]>([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [intoleSeleccionada, setIntoleSeleccionada] = useState<Intolerancia | null>(null);
useEffect(() => {
  const cargarIntole= async()=>{
    try{
      const response = await axios.get('http://localhost:9000/api/intolerancias');
      setIntolerancias(response.data)
    
    }catch(error){
      console.log("Error al cargar la intolerancia", error)
    }
  }
  cargarIntole()
},[]);


  const handleSaberMas = (intolerancia: Intolerancia) => {
  setIntoleSeleccionada(intolerancia);
  setModalOpen(true); 
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSoy = () => {
  if(intoleSeleccionada){
    //almaceno la intolerancia en el localStorage
    localStorage.setItem("intoleranciaSeleccionada", intoleSeleccionada.nombre);
    window.location.href = "/restaurantes"
  }
    // alert("Eres intolerante a...");
  };

  return (
    <>
      <Navigation />

      <div className="container">
        <h1>Intolerancias</h1>
        <div className="card-container">

        {intolerancias.map((intolerancia: Intolerancia, index: number) => (
  <IntoleranciaCard
    key={index}
    nombre={intolerancia.nombre}
    descripcion={intolerancia.descripcion}
    imagen={intolerancia.imagen} // Ruta como "/icons/gluten.svg"
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
      imagen={intoleSeleccionada?.imagen || ""}  // Pasando la imagen
      motivacion={intoleSeleccionada?.mensaje || ""} 
    />
      
    </>
  );
}

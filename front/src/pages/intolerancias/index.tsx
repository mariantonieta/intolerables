import IntoleranciaCard from "../../components/cardintole/IntolerancaCard";
import Navigation from "../../containers/navigation";
import "./index.css";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalElegirRoR from "../../components/modalrecetaorestaurante";

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
  const [modalElegirOpen, setModalElegirOpen] = useState(false); 
  const [intoleSeleccionada, setIntoleSeleccionada] = useState<Intolerancia | null>(null);
  const navigate = useNavigate()
useEffect(() => {
  const cargarIntole= async()=>{
    try{
      const response = await axios.get('http://localhost:9000/api/intolerancias',{

        withCredentials: true
      });
      setIntolerancias(response.data)
      console.log(response.data)
    
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

  const handleSoy = (intolerancia: Intolerancia)  => {
    setIntoleSeleccionada(intolerancia); // <- actualiza el estado
    localStorage.setItem("intoleranciaSeleccionada", intolerancia.nombre);
    setModalOpen(false);
    setModalElegirOpen(true);    // alert("Eres intolerante a...");
  };
  const handleCloseModal = () => setModalElegirOpen(false);

  const handleRecetasClick = () => {
    setModalOpen(false);
    navigate("/recetas"); // Redirige a recetas
  };

  const handleRestaurantesClick = () => {
    setModalOpen(false);
    navigate("/restaurantes"); // Redirige a restaurantes
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
    buttonSoy={() => handleSoy(intolerancia)}
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
      onSoyClick={() => intoleSeleccionada && handleSoy(intoleSeleccionada)}

  />
           <ModalElegirRoR
        open={modalElegirOpen}
        onClose={handleCloseModal}
        onRecetasClick={handleRecetasClick}
        onRestaurantesClick={handleRestaurantesClick}
      />
    </>
  );
}

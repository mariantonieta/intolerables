import IntoleranciaCard from "../../components/cardintole/IntolerancaCard";
import Navigation from "../../containers/navigation";
import "./index.css";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import ModalElegirRoR from "../../components/modalrecetaorestaurante";
import api from "../../services/axiosConfig";
//Datos Tipados que se reciben desde el backend
interface Intolerancia {
  nombre: string;
  descripcion: string;
  detalles: string;
  mensaje: string;
  imagen: string;
}
export default function Intolerancias() {
  const [intolerancias, setIntolerancias] = useState<Intolerancia[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalElegirOpen, setModalElegirOpen] = useState(false);
  const [intoleSeleccionada, setIntoleSeleccionada] =
    useState<Intolerancia | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const cargarIntole = async () => {
      try {
        const response = await api.get("/api/intolerancias");
        setIntolerancias(response.data);
        console.log("Intolerancias cargadas:", response.data);
      } catch (error) {
        console.error("Error al cargar la intolerancia", error);
      }
    };

    cargarIntole();
  }, []);

  const handleSaberMas = (intolerancia: Intolerancia) => {
    console.log("INTOLERANCIA DETALLES:", intolerancia.detalles);
    setIntoleSeleccionada(intolerancia);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSoy = async (intolerancia: Intolerancia) => {
    try {
      setIntoleSeleccionada(intolerancia);
      localStorage.setItem("intoleranciaSeleccionada", intolerancia.nombre);
      setModalOpen(false);
      setModalElegirOpen(true);

      // Hacer POST al backend para guardar la intolerancia del usuario
      const response = await api.post("/api/intolerancias/seleccionar", {
        nombre: intolerancia.nombre,
      });

      console.log(" Intolerancia guardada en el servidor:", response.status);
    } catch (error) {
      console.error(" Error al guardar la intolerancia:", error);
    }
  };
  const handleCloseModal = () => setModalElegirOpen(false);
  //al seleccionar la intolerancia se abre el modal para elegir lo q quiero buscar
  //recetas o restaurantes
  const handleRecetasClick = () => {
    setModalOpen(false);
    navigate("/recetas"); //
  };

  const handleRestaurantesClick = () => {
    setModalOpen(false);
    navigate("/restaurantes");
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
              imagen={intolerancia.imagen}
              buttonSaberMas={() => handleSaberMas(intolerancia)}
              buttonSoy={() => handleSoy(intolerancia)}
            />
          ))}
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        title={intoleSeleccionada?.nombre || ""}
        content={intoleSeleccionada?.detalles || ""}
        imagen={intoleSeleccionada?.imagen || ""}
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

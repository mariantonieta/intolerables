import IntoleranciaCard from "../../components/cardintole/IntolerancaCard";
import "./index.css";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";
import ModalElegirRoR from "../../components/modalrecetaorestaurante";
import api from "../../services/axiosConfig";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

// Datos Tipados que se reciben desde el backend
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
       const response = await api.get(`/api/intolerancias`, {
            params: { lang: i18next.language || 'es' }
        });
         setIntolerancias(response.data);
        console.log("Intolerancias cargadas:", response.data);
      } catch (error) {
        console.error("Error al cargar la intolerancia", error);
      }
    };

    cargarIntole();
  }, []);

  const handleSaberMas = (intolerancia: Intolerancia) => {
    setIntoleSeleccionada(intolerancia);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalElegirOpen(false);
  };

  const handleRecetasClick = () => {
    setModalElegirOpen(false);
    navigate("/recetas");
  };

  const handleRestaurantesClick = () => {
    setModalElegirOpen(false);
    navigate("/restaurantes");
  };

  const handleSoy = async (intolerancia: Intolerancia) => {
    try {
      setIntoleSeleccionada(intolerancia);
      localStorage.setItem("intoleranciaSeleccionada", intolerancia.nombre);
      setModalOpen(false);
      setModalElegirOpen(true);

      const token = localStorage.getItem("jwtToken");
      if (token) {
        const response = await api.post(
          "/api/intolerancias/seleccionar",
          { nombre: intolerancia.nombre },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Intolerancia guardada en el servidor:", response.status);
      } else {
        console.log(
          "Usuario no autenticado, intolerancia guardada solo en localStorage."
        );
      }
    } catch (error) {
      console.error("Error al guardar la intolerancia:", error);
    }
  };
const {t} = useTranslation()
  return (
    <div>
      <div className="page">
        <div className="container">
          <h1>{t("intolerances_title")}</h1>
          <div className="card-container">
            {intolerancias.map((intolerancia, index) => (
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
      </div>
    </div>
  );
}

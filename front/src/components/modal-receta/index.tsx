import React from "react";
import "./index.css";
//modal para ver mas detalles de la receta

interface ModalRecetaProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image: string;
  tiempo: number;
  calorias: number;
  ingredientes: string[];
  preparacion: string[];
}

const ModalReceta: React.FC<ModalRecetaProps> = ({
  open,
  onClose,
  title,
  image,
  tiempo,
  calorias,
  ingredientes,
  preparacion,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-info">
          <p>{tiempo} Min</p>
          <p>{calorias} Kcal</p>
        </div>
        <img src={image} alt={title} className="modal-image" />

        <div className="modal-details">
          <div className="column">
            <h3 className="section-title">INGREDIENTES:</h3>
            <ul>
              {ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3 className="section-title">PREPARACIÓN:</h3>
            <ul>
              {preparacion.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <button className="ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalReceta;

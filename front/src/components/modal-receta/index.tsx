import React from "react";
import { Dialog, DialogContent, Button, Typography } from "@mui/material";
import './index.css';

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
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ className: "modal-animado" }}>
      <DialogContent>
          <div className="modal-content">
           
            <div className="modal-header">
              <img src={image} alt={title} className="modal-image" />
              <div className="modal-info">
                <Typography variant="body2">{tiempo} Min</Typography>
                <Typography variant="body2">{calorias} Kcal</Typography>
              </div>
            </div>

            <div className="modal-title-container">
              <Typography variant="h6" className="modal-title">{title}</Typography>
            </div>

            <div className="modal-details">
              <div className="column">
                <Typography variant="h6" className="section-title">Ingredientes</Typography>
                <ul>
                  {ingredientes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="column">
                <Typography variant="h6" className="section-title">Preparación</Typography>
                <ul>
                  {preparacion.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Button onClick={onClose} className="ok-button">
              OK
            </Button>
          </div>

      </DialogContent>
    </Dialog>
  );
};

export default ModalReceta;

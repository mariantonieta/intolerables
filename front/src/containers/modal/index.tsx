// components/Modal.tsx
import React from 'react';
import {Dialog, DialogTitle, Button} from "@mui/material";

import "./index.css"

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onRecetasClick: () => void;
  onRestaurantesClick: () => void;
}

const ModalElegir: React.FC<ModalProps> = ({ open, onClose, onRecetasClick, onRestaurantesClick }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className='titulo'>¿Qué te gustaría ver?</DialogTitle>
       <div className='modal-btns'>
        <Button onClick={onRecetasClick}>Ver Recetas</Button>
        <Button onClick={onRestaurantesClick}>Ver Restaurantes</Button>
        <Button className="close-btn" onClick={onClose}>Cerrar</Button>
      
    </div>
    </Dialog>
  );
};

export default ModalElegir;

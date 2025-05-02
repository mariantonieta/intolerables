import { Dialog, DialogTitle, Button } from "@mui/material";
import "./index.css";

interface ModalAlertaProps {
  open: boolean;
  onClose: () => void;
  mensaje: string;
}

const ModalAlerta: React.FC<ModalAlertaProps> = ({ open, onClose, mensaje }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="titulo">¡Error!</DialogTitle>
      <div className="modal-content">
        <p>{mensaje}</p>
        <div className="btns">
          <Button onClick={onClose} variant="contained" className="btn-modal">
            OK
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalAlerta;

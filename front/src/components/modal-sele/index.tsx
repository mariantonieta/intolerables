
import { Dialog, DialogTitle, Button } from "@mui/material";
import "./index.css";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions: { label: string; onClick: () => void; variant?: "text" | "outlined" | "contained" }[];
}

const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, title, actions }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="titulo">{title}</DialogTitle>
      <div className="modal-btns">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant || "outlined"}
          >
            {action.label}
          </Button>
        ))}
        <Button className="close-btn" onClick={onClose}>Cerrar</Button>
      </div>
    </Dialog>
  );
};

export default ModalBase;

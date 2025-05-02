
  import { Dialog, DialogTitle, Button } from "@mui/material";
  import "./index.css";
import { useEffect, useRef } from "react";
  //modal base para reutilizarlo
  interface ModalBaseProps {
    open: boolean;
    onClose: () => void;
    title: string;
    actions: { label: string; onClick: () => void; variant?: "text" | "outlined" | "contained" }[];
    children?: React.ReactNode;
  }

  const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, title, actions, children }) => {
    const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && btnsRef.current) {
      btnsRef.current.classList.add("animate");
    } else if (btnsRef.current) {
      btnsRef.current.classList.remove("animate");
    }
  }, [open]);
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      
        <DialogTitle className="titulo">{title}
          
        </DialogTitle>
        <div className="modal-content">
          {children}
        </div>
          
        <div className="btns">

          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant || "outlined"}
              className="btn-modal"
            >
              {action.label}
            </Button>
          ))}
          <Button className="btn-modal"onClick={onClose}>Cerrar</Button>
        </div>
      </Dialog>
    );
  };

  export default ModalBase;

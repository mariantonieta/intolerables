import { Dialog, DialogTitle, Button } from "@mui/material";
import "./index.css";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ModalAction = {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
};

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions?: ModalAction[]; 
  children?: React.ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, title, actions = [], children }) => {
  const btnsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (open && btnsRef.current) {
      btnsRef.current.classList.add("animate");
    } else if (btnsRef.current) {
      btnsRef.current.classList.remove("animate");
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="titulo">{title}</DialogTitle>
      <div className="modal-content">{children}</div>

      <div className="btns" ref={btnsRef}>
        {actions.map(({ label, onClick, variant }, index) => (
          <Button key={index} onClick={onClick} variant={variant ?? "outlined"} className="btn-modal">
            {label}
          </Button>
        ))}
        <Button className="btn-modal" onClick={onClose}>
          {t("close")}
        </Button>
      </div>
    </Dialog>
  );
};

export default ModalBase;

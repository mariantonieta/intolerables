import {Dialog, DialogTitle, DialogContent, Button, Typography} from "@mui/material";
import './style.css'
//modal para saber mas sobre una intolerancia
interface DialogProps{
    open: boolean;
    onClose: ()=> void;
    title:string;
    content: string;
    imagen: string
    motivacion: string;
    onSoyClick?: () => void;
     }
    export default function Modal({ open, onClose, title, content, imagen, motivacion, onSoyClick }: DialogProps) {
        return (
          <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"   PaperProps={{ className: "modal-animado" }}
>
            <DialogTitle className="titulo">{title}</DialogTitle>
            <DialogContent>
            <img src={imagen} alt={title} className="modal-img"/>
              <Typography className="texto">{content}</Typography>
              {motivacion && <p><strong>¡No estás solo!:</strong> {motivacion}</p>}
            </DialogContent>
            <div className="btns">
              <Button onClick={onClose} className="btn-modal">
                Cerrar
              </Button>
              <Button onClick={onSoyClick} className="btn-modal">Soy</Button>
            </div>
          </Dialog>
        );
      }
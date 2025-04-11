import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from "@mui/material";
import './style.css'
interface DialogProps{
    open: boolean;
    onClose: ()=> void;
    title:string;
    content: string;
    imagen: string
    motivacion: string;
     }
    export default function Modal({ open, onClose, title, content, imagen, motivacion }: DialogProps) {
        return (
          <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" className="container">
            <DialogTitle className="titulo">{title}</DialogTitle>
            <DialogContent className="contenido">
            <img src={imagen} alt={title} style={{ width: '100px', height: '100px' }} />
    
              <Typography className="texto">{content}</Typography>
              {motivacion && <p><strong>¡No estás solo!:</strong> {motivacion}</p>}
            </DialogContent>
            <DialogActions className="btns">
              <Button onClick={onClose} className="btn-modal">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        );
      }
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from "@mui/material";
import './style.css'
interface DialogProps{
    open: boolean;
    onClose: ()=> void;
    title:string;
    content: string;
     }
    export default function Modal({ open, onClose, title, content }: DialogProps) {
        return (
          <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" className="container">
            <DialogTitle className="titulo">{title}</DialogTitle>
            <DialogContent className="contenido">
              <Typography className="texto">{content}</Typography>
            </DialogContent>
            <DialogActions className="btns">
              <Button onClick={onClose} className="btn-modal">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        );
      }
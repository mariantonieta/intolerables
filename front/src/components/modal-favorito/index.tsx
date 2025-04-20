import { Dialog, DialogContent } from "@mui/material";
import "../modal/style.css";
type ModalFavoritosProps = {
  open: boolean;
  onClose: () => void;
  favoritos: {
    nombreRestaurante: string;
    fecha: string | null;
  }[];
};

export default function ModalFavoritos({ open, onClose, favoritos }: ModalFavoritosProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2 className="titulo">Tus Restaurantes Favoritos</h2>
        {favoritos.length === 0 ? (
  <p className="texto">Aún no tienes restaurantes favoritos guardados.</p>
) : (
  favoritos.map((fav, index) => (
    <div key={index} className="texto">
         <h3>
      <a
        href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(fav.nombreRestaurante)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="favorito-link"
      >
        {fav.nombreRestaurante}
      </a>
    </h3>
    </div>
  ))
)}
        <div className="btns">
          <button onClick={onClose} className="btn-modal">Cerrar</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

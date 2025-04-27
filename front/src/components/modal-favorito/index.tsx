import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import "../modal-receta/index.css"
type FavoritoRecetaDTO = {
  id: number;
  nombreReceta: string;
};

type FavoritoRestauranteDTO = {
  nombreRestaurante: string;
};

type ModalFavoritosProps = {
  open: boolean;
  onClose: () => void;
  favoritosRecetas: FavoritoRecetaDTO[];
  favoritosRestaurantes: FavoritoRestauranteDTO[];
};

export default function ModalFavoritos({
  open,
  onClose,
  favoritosRecetas,
  favoritosRestaurantes,
}: ModalFavoritosProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ className: "modal-animado" }}>
      <DialogContent>
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>✖</button>

          <div className="modal-title-container">
            <Typography variant="h6" className="modal-title">Tus Favoritos</Typography>
          </div>

          <div className="modal-details">
            <div className="column">
              <Typography variant="h6" className="section-title">Recetas</Typography>
              {favoritosRecetas.length === 0 ? (
                <p className="texto">Aún no tienes recetas favoritas guardadas.</p>
              ) : (
                <ul>
                  {favoritosRecetas.map((fav) => (
                    <li key={fav.id}>
                      <a href={`/receta/${fav.id}`} className="favorito-link">{fav.nombreReceta}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="column">
              <Typography variant="h6" className="section-title">Restaurantes</Typography>
              {favoritosRestaurantes.length === 0 ? (
                <p className="texto">Aún no tienes restaurantes favoritos guardados.</p>
              ) : (
                <ul>
                  {favoritosRestaurantes.map((fav) => (
                    <li key={fav.nombreRestaurante}>
                      <a
                        href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(fav.nombreRestaurante)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="favorito-link"
                      >
                        {fav.nombreRestaurante}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Button onClick={onClose} className="ok-button">
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

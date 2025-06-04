import { Dialog, DialogContent, Typography, Button } from "@mui/material";

import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";
import "./index.css"

type FavoritoRecetaDTO = {
  id: number;
  nombreReceta: string;
};

type FavoritoRestauranteDTO = {
  nombreRestaurante: string;
    id: number;
};

type ModalFavoritosProps = {
  open: boolean;
  onClose: () => void;
  favoritosRecetas: FavoritoRecetaDTO[];
  favoritosRestaurantes: FavoritoRestauranteDTO[];
  onEliminarFavoritoReceta?: (id: number) => void;
   onEliminarFavoritoRestaurante?: (id: number) => void;
};

export default function ModalFavoritos({
  open,
  onClose,
  favoritosRecetas,
  favoritosRestaurantes,
  onEliminarFavoritoReceta,
    onEliminarFavoritoRestaurante,
}: ModalFavoritosProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ className: "modal-animado" }}>
      <DialogContent>
        <div className="modal-content">
          <div className="modal-title-container">
            <Typography variant="h6" className="modal-title">
              {t("favorites")}
            </Typography>
          </div>

          <div className="modal-details">
         
            <div className="column">
              <Typography variant="h6" className="section-title">{t("recipe")}</Typography>
              {favoritosRecetas.length === 0 ? (
                <p className="texto">{t("not_favorites")}</p>
              ) : (
                <ul>
                  {favoritosRecetas.map((receta) => (
                    <li key={receta.id} className="favorito-item">
                      <a>
                        {receta.nombreReceta}
                      </a>
                      {onEliminarFavoritoReceta && (
                        <button
                          className="eliminar-btn"
                          onClick={() => onEliminarFavoritoReceta(receta.id)}
                          aria-label={`Eliminar ${receta.nombreReceta}`}
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="column">
              <Typography variant="h6" className="section-title">{t("restaurant")}</Typography>
              {favoritosRestaurantes.length === 0 ? (
                <p className="texto">{t("not_restaurant")}</p>
              ) : (
                <ul>
                  {favoritosRestaurantes.map((fav) => (
                    <li key={fav.nombreRestaurante} className="favorito-item">
                      <a
                        href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(fav.nombreRestaurante)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="favorito-link"
                      >
                        {fav.nombreRestaurante}
                      </a>
                        {onEliminarFavoritoRestaurante && (
                    <button
                      className="eliminar-btn"
                      onClick={() => onEliminarFavoritoRestaurante(fav.id)}
                      aria-label={`Eliminar ${fav.nombreRestaurante}`}
                    >
                      <FaTrashAlt />
                    </button>
                  )}
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

import { Dialog, DialogContent } from "@mui/material";
import "../modal/style.css";

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
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h2 className="titulo">Tus Favoritos</h2>

        {/* Mostrar Favoritos de Recetas */}
        <div>
          <h3>Recetas</h3>
          {favoritosRecetas.length === 0 ? (
            <p className="texto">Aún no tienes recetas favoritas guardadas.</p>
          ) : (
            favoritosRecetas.map((fav) => (
              <div key={fav.id} className="texto">
                <h4>
                  <a
                    href={`/receta/${fav.id}`} // Aquí puedes agregar la URL para ver la receta
                    className="favorito-link"
                  >
                    {fav.nombreReceta}
                  </a>
                </h4>
              </div>
            ))
          )}
        </div>

        {/* Mostrar Favoritos de Restaurantes */}
        <div>
          <h3>Restaurantes</h3>
          {favoritosRestaurantes.length === 0 ? (
            <p className="texto">Aún no tienes restaurantes favoritos guardados.</p>
          ) : (
            favoritosRestaurantes.map((fav) => (
              <div key={fav.nombreRestaurante} className="texto"> {/* Usamos solo el nombre del restaurante como clave */}
                <h4>
                  <a
                    href={`https://www.yelp.com/search?find_desc=${encodeURIComponent(
                      fav.nombreRestaurante
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="favorito-link"
                  >
                    {fav.nombreRestaurante}
                  </a>
                </h4>
              </div>
            ))
          )}
        </div>

        <div className="btns">
          <button onClick={onClose} className="btn-modal">
            Cerrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

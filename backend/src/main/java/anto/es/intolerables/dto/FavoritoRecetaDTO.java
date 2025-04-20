package anto.es.intolerables.dto;

import anto.es.intolerables.entities.FavoritoReceta;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class FavoritoRecetaDTO {
    private String tituloReceta;
    private LocalDate fecha;

    public FavoritoRecetaDTO(FavoritoReceta favorito) {
        this.tituloReceta = favorito.getReceta().getTitulo();
        this.fecha = favorito.getFecha();
    }
}

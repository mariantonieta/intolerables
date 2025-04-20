package anto.es.intolerables.dto;

import anto.es.intolerables.entities.FavoritoRestaurante;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FavoritoRestauranteDTO {
    private String nombreRestaurante;
    private LocalDate fecha;

    public FavoritoRestauranteDTO(FavoritoRestaurante favorito) {
        this.nombreRestaurante = favorito.getRestaurante().getNombre();
        this.fecha = favorito.getFecha();
    }
}

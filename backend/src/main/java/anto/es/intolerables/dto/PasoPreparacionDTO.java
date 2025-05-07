package anto.es.intolerables.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasoPreparacionDTO {
    private String descripcion;

    public PasoPreparacionDTO(String descripcion) {
        this.descripcion = descripcion;
    }
}
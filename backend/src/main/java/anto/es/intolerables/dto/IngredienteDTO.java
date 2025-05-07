package anto.es.intolerables.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredienteDTO {
    private Integer id;
    private String nombre;
    private String cantidad; // Agregamos cantidad

    // Constructor con todos los atributos
    public IngredienteDTO(Integer id, String nombre, String cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}
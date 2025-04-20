package anto.es.intolerables.dto;

import anto.es.intolerables.entities.Intolerancia;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IntoleranciaDTO {
    private Integer id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private String detalles;  // ¡Agregalo!
    private String mensaje;

    // Constructor que recibe directamente los parámetros esperados
    public IntoleranciaDTO(Integer id, String nombre, String descripcion, String imagen, String detalles, String mensaje) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.detalles = detalles;
        this.mensaje = mensaje;
    }


    // Constructor que toma la entidad Intolerancia
    public IntoleranciaDTO(Intolerancia intolerancia) {
        this.id = intolerancia.getId();
        this.nombre = intolerancia.getNombre();
        this.descripcion = intolerancia.getDescripcion();
        this.imagen = intolerancia.getImagen();
        this.detalles = intolerancia.getDetalles();
        this.mensaje = intolerancia.getMensaje();
    }
}
